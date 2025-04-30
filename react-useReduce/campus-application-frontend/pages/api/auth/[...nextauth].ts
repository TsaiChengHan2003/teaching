import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  'providers': [
    GoogleProvider({
      'clientId': process.env.GOOGLE_CLIENT_ID as string,
      'clientSecret': process.env.GOOGLE_CLIENT_SECRET as string,
      'authorization': {
        'params': {
          'prompt': 'consent',
          'access_type': 'offline',
          'response_type': 'code'
        }
      }
    }),
  ],
  'secret': process.env.NEXTAUTH_SECRET,
  'callbacks': {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token;
      return session;
    },
  },
  'session': { 'maxAge': 60 * 60 * 24 * 15, }
});