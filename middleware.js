// middleware.js - Di root folder project
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Prevent redirect loops
  if (pathname.includes('error=Configuration')) {
    console.log('🔄 Configuration error detected, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Handle auth redirects properly
  if (pathname === '/login' && request.nextUrl.searchParams.has('error')) {
    const cleanUrl = new URL('/login', request.url)
    return NextResponse.redirect(cleanUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}