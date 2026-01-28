import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-admin-session');

    if (!sessionId) {
      return NextResponse.json(
        { valid: false, error: 'No session provided' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    // Check if session exists and is not expired (24 hours)
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error || !session) {
      return NextResponse.json(
        { valid: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - new Date(session.created_at).getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (sessionAge > maxAge) {
      // Delete expired session
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('id', sessionId);

      return NextResponse.json(
        { valid: false, error: 'Session expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true, email: session.email });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
