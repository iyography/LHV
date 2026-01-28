import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-admin-session');

    if (!sessionId) {
      return NextResponse.json({ success: true });
    }

    const supabase = createServerClient();

    // Delete session
    await supabase
      .from('admin_sessions')
      .delete()
      .eq('id', sessionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
