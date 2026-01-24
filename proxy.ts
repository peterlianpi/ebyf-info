import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from "next/headers";

export async function proxy(request:NextRequest) {
  const url = request.nextUrl.clone();

  // Allow PWA core files
  const pwaFiles = ['/manifest.json', '/sw.js', '/workbox'];
  if (pwaFiles.some(file => url.pathname.includes(file))) {
    return NextResponse.next();
  }

//   // Example auth logic
//   const cookieStore = await cookies();
//   const token = cookieStore.get('accessToken');
//   const isLoggedIn = Boolean(token);

//   if (!isLoggedIn && url.pathname !== '/sign-in') {
//     url.pathname = '/sign-in';
//     return NextResponse.redirect(url);
//   }

//   if (isLoggedIn && url.pathname === '/sign-in') {
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|images).*)',
  ],
};
