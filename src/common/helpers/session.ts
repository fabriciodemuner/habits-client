// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { Handler, withIronSession } from 'next-iron-session';

export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD!,
    cookieName: 'qhid',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
