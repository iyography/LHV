import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
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
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { success: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - new Date(session.created_at).getTime();
    const maxAge = 24 * 60 * 60 * 1000;

    if (sessionAge > maxAge) {
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('id', sessionId);

      return NextResponse.json(
        { success: false, error: 'Session expired' },
        { status: 401 }
      );
    }

    // Get all affiliate payments
    const { data: payments, error } = await supabase
      .from('affiliate_payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch affiliate payments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: payments || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
