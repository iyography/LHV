import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { affiliateLink } = await request.json();

    if (!affiliateLink) {
      return NextResponse.json(
        { error: "Affiliate link is required" },
        { status: 400 }
      );
    }

    // Extract username from affiliate link (e.g., ?ref=username or ?g=username)
    let username = "Unknown";
    try {
      const url = new URL(affiliateLink);
      username = url.searchParams.get("ref") || url.searchParams.get("g") || "Unknown";
    } catch {
      // If URL parsing fails, try to extract from string
      const refMatch = affiliateLink.match(/[?&](ref|g)=([^&]+)/);
      if (refMatch) {
        username = refMatch[2];
      }
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Save to Supabase
    try {
      const supabase = createServerClient();
      await supabase.from("affiliate_links").insert({
        affiliate_link: affiliateLink,
        username: username,
        created_at: new Date().toISOString(),
      });
    } catch (dbError) {
      console.error("Supabase error:", dbError);
      // Continue even if DB save fails
    }

    // Send Slack notification
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      try {
        await fetch(slackWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "🔗 New Affiliate Link Generated!",
                  emoji: true,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Username:*\n${username}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Generated At:*\n${timestamp}`,
                  },
                ],
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Affiliate Link:*\n${affiliateLink}`,
                },
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: "Someone just activated their affiliate templates on Ninja AI!",
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackError) {
        console.error("Slack notification error:", slackError);
      }
    }

    // Send email notification
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (resendApiKey && notificationEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Ninja AI <onboarding@resend.dev>",
            to: notificationEmail,
            subject: `🔗 Link Generated: ${username}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A0A0A; color: #FAF6E3; padding: 40px 20px; }
                  .container { max-width: 500px; margin: 0 auto; background: #1A1A1A; border-radius: 16px; padding: 32px; border: 1px solid #333; }
                  .header { text-align: center; margin-bottom: 24px; }
                  .header h1 { color: #D4A853; font-size: 24px; margin: 0; }
                  .badge { display: inline-block; background: #D4A853; color: #0A0A0A; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
                  .field { margin-bottom: 16px; padding: 16px; background: #0A0A0A; border-radius: 8px; border: 1px solid #333; }
                  .field-label { color: #D4A853; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
                  .field-value { color: #FAF6E3; font-size: 16px; word-break: break-all; }
                  .footer { text-align: center; margin-top: 24px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <span class="badge">LINK GENERATED</span>
                    <h1>New Affiliate Active!</h1>
                  </div>
                  <div class="field">
                    <div class="field-label">Username</div>
                    <div class="field-value">${username}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Affiliate Link</div>
                    <div class="field-value">${affiliateLink}</div>
                  </div>
                  <div class="field">
                    <div class="field-label">Generated At</div>
                    <div class="field-value">${timestamp}</div>
                  </div>
                  <div class="footer">
                    Someone just activated their affiliate templates on Ninja AI!
                  </div>
                </div>
              </body>
              </html>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Link generated notification error:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
}
