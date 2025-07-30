import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../lib/prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
  async signIn({ user, account, profile }) {
    if (!user.email) return false;

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name ?? '',
          image: user.image ?? '',
          role: 'pasien',
          password: '',
        },
      });

      await prisma.account.create({
        data: {
          userId: newUser.id,
          type: account!.type,
          provider: account!.provider,
          providerAccountId: account!.providerAccountId,
          access_token: account!.access_token,
          refresh_token: account!.refresh_token,
          expires_at: account!.expires_at ?? undefined,
          token_type: account!.token_type ?? undefined,
          id_token: account!.id_token ?? undefined,
          scope: account!.scope ?? undefined,
          session_state: account!.session_state ?? undefined,
        },
      });
    } else {
      const linkedAccount = await prisma.account.findFirst({
        where: {
          userId: dbUser.id,
          provider: account!.provider,
        },
      });

      if (!linkedAccount) {
        await prisma.account.create({
          data: {
            userId: dbUser.id,
            type: account!.type,
            provider: account!.provider,
            providerAccountId: account!.providerAccountId,
            access_token: account!.access_token,
            refresh_token: account!.refresh_token,
            expires_at: account!.expires_at ?? undefined,
            token_type: account!.token_type ?? undefined,
            id_token: account!.id_token ?? undefined,
            scope: account!.scope ?? undefined,
            session_state: account!.session_state ?? undefined,
          },
        });
      }
    }

    return true;
}
  ,
      async redirect({ baseUrl }) {
        return `${baseUrl}/dashboard/pasien`
      }
    }
}
