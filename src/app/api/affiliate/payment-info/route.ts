import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { Resend } from 'resend';

// Send email notification
async function sendEmailNotification(data: {
  name: string;
  email: string;
  skoolUsername: string;
  paymentMethod: string;
  paymentHandle: string;
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!notificationEmail || !apiKey) {
    console.log('Email notification skipped: missing config');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Ninja AI Affiliates <onboarding@resend.dev>',
      to: notificationEmail,
      subject: `🎉 New Affiliate Payment Info: ${data.name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FAF6E3; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: Georgia, serif; font-size: 32px; color: #D4A853; margin: 0;">Ninja AI</h1>
            <p style="color: #FAF6E3; opacity: 0.6; margin-top: 8px;">New Affiliate Payment Submission</p>
          </div>

          <div style="background: rgba(212, 168, 83, 0.1); border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-family: Georgia, serif; color: #D4A853; margin: 0 0 16px 0; font-size: 20px;">Affiliate Details</h2>

            <div style="margin-bottom: 12px;">
              <span style="color: #FAF6E3; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span>
              <p style="color: #FAF6E3; margin: 4px 0 0 0; font-size: 16px;">${data.name}</p>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #FAF6E3; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
              <p style="color: #FAF6E3; margin: 4px 0 0 0; font-size: 16px;"><a href="mailto:${data.email}" style="color: #9EB1C7;">${data.email}</a></p>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #FAF6E3; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Skool Username</span>
              <p style="color: #FAF6E3; margin: 4px 0 0 0; font-size: 16px;">@${data.skoolUsername}</p>
            </div>
          </div>

          <div style="background: rgba(158, 177, 199, 0.1); border: 1px solid rgba(158, 177, 199, 0.3); border-radius: 12px; padding: 24px;">
            <h2 style="font-family: Georgia, serif; color: #9EB1C7; margin: 0 0 16px 0; font-size: 20px;">Payment Information</h2>

            <div style="margin-bottom: 12px;">
              <span style="color: #FAF6E3; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Payment Method</span>
              <p style="color: #FAF6E3; margin: 4px 0 0 0; font-size: 16px; text-transform: capitalize;">${data.paymentMethod}</p>
            </div>

            <div>
              <span style="color: #FAF6E3; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${data.paymentMethod === 'zelle' ? 'Email/Phone' : 'Username'}</span>
              <p style="color: #D4A853; margin: 4px 0 0 0; font-size: 18px; font-weight: bold;">${data.paymentHandle}</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(250, 246, 227, 0.1);">
            <p style="color: #FAF6E3; opacity: 0.4; font-size: 12px; margin: 0;">Submitted at ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

// Send Slack notification
async function sendSlackNotification(data: {
  name: string;
  email: string;
  skoolUsername: string;
  paymentMethod: string;
  paymentHandle: string;
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('Slack notification skipped: no webhook URL');
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🎉 New Affiliate Payment Submission',
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Name:*\n${data.name}` },
              { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
            ],
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Skool Username:*\n@${data.skoolUsername}` },
              { type: 'mrkdwn', text: `*Payment Method:*\n${data.paymentMethod.charAt(0).toUpperCase() + data.paymentMethod.slice(1)}` },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Payment Handle:*\n\`${data.paymentHandle}\``,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `Submitted at ${new Date().toLocaleString()}`,
              },
            ],
          },
        ],
      }),
    });
    console.log('Slack notification sent successfully');
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, skoolUsername, paymentMethod, paymentHandle } = body;

    // Validate required fields
    if (!name || !email || !skoolUsername || !paymentMethod || !paymentHandle) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!['paypal', 'venmo', 'zelle'].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Try to save to Supabase (but don't fail if it doesn't work)
    try {
      const supabase = createServerClient();
      const { error } = await supabase
        .from('affiliate_payments')
        .insert({
          name,
          email,
          skool_username: skoolUsername,
          payment_method: paymentMethod,
          payment_handle: paymentHandle,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Supabase error:', error);
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Continue anyway - notifications are more important
    }

    // Send notifications (don't await - fire and forget for faster response)
    const notificationData = { name, email, skoolUsername, paymentMethod, paymentHandle };
    sendEmailNotification(notificationData);
    sendSlackNotification(notificationData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
