import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const sessionId = request.headers.get('x-admin-session');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    // Verify session
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .select('session_id')
      .eq('session_id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Fetch all quiz submissions
    const { data: submissions, error: fetchError } = await supabase
      .from('quiz_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Fetch submissions error:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    console.error('Submissions GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
