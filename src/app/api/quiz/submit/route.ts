import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      track,
      archetype,
      archetypeName,
      bottleneck,
      recommendedTier,
      strikeZone,
      focus,
      ignoreList,
      sixtyDayPath,
      answers,
      userAgent,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !track || !archetype) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: fullName, email, phone, track, archetype' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert({
        full_name: fullName,
        email,
        phone,
        track,
        archetype,
        archetype_name: archetypeName,
        bottleneck,
        recommended_tier: recommendedTier,
        strike_zone: strikeZone,
        focus,
        ignore_list: ignoreList,
        sixty_day_path: sixtyDayPath,
        answers,
        user_agent: userAgent,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // Send Slack webhook notification
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🥷 New Quiz Submission!\nName: ${fullName}\nEmail: ${email}\nArchetype: ${archetypeName}\nTrack: ${track}\nTier: ${recommendedTier}`,
          }),
        });
      } catch (slackError) {
        console.error('Slack notification failed:', slackError);
      }
    }

    // Send results email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Ninja AI <quiz@ninja-ai.com>';

        const focusHtml = Array.isArray(focus)
          ? focus.map((f: string) => `<li style="margin-bottom:6px;">${f}</li>`).join('')
          : '';

        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `Your Dojo Assessment Results: ${archetypeName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;">
              <h1 style="color:#fff;font-size:24px;margin-bottom:4px;">Your Dojo Assessment Results</h1>
              <p style="color:#a3a3a3;margin-top:0;">Here are your personalized results, ${fullName}.</p>

              <div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
                <h2 style="color:#facc15;font-size:18px;margin-top:0;">Archetype: ${archetypeName}</h2>
                ${strikeZone ? `<p style="margin:8px 0;"><strong style="color:#fff;">Dojo Path:</strong> ${strikeZone}</p>` : ''}
                ${bottleneck ? `<p style="margin:8px 0;"><strong style="color:#fff;">Bottleneck:</strong> ${bottleneck}</p>` : ''}
                ${recommendedTier ? `<p style="margin:8px 0;"><strong style="color:#fff;">Recommended Tier:</strong> ${recommendedTier}</p>` : ''}
              </div>

              ${focusHtml ? `
              <div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
                <h3 style="color:#fff;margin-top:0;">Focus Areas</h3>
                <ul style="padding-left:20px;color:#d4d4d4;">${focusHtml}</ul>
              </div>` : ''}

              ${sixtyDayPath ? `
              <div style="background:#171717;border-radius:8px;padding:20px;margin:24px 0;">
                <h3 style="color:#fff;margin-top:0;">Your 60-Day Path</h3>
                <p style="color:#d4d4d4;">${sixtyDayPath}</p>
              </div>` : ''}

              <p style="color:#737373;font-size:12px;margin-top:32px;text-align:center;">&copy; Ninja AI. All rights reserved.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Resend email failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
