import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Skip supabase logic if environment variables are missing or are placeholders
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';

  if (!isSupabaseConfigured) {
    return response;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value)
            })
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Required to refresh the session
    await supabase.auth.getUser()

    // 1. Fetch Maintenance Mode Setting
    const { data: setting, error: fetchError } = await supabase
      .from('settings')
      .select('maintenance_enabled')
      .eq('id', 'maintenance_mode')
      .single()

    const isMaintenanceMode = !fetchError && setting?.maintenance_enabled
    const isDevelopment =
      process.env.NODE_ENV === 'development' ||
      request.nextUrl.hostname === 'localhost' ||
      request.nextUrl.hostname === '127.0.0.1';

    if (isDevelopment) {
      // In development, we don't want maintenance mode to affect us.
      return response;
    }

    // Production logic
    if (isMaintenanceMode) {
      if (!request.nextUrl.pathname.startsWith('/maintenance')) {
        return NextResponse.redirect(new URL('/maintenance', request.url))
      }
    } else {
      if (request.nextUrl.pathname.startsWith('/maintenance')) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  } catch (error) {
    console.error('Supabase middleware error:', error)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
