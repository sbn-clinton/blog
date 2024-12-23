import prisma from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import  { Adapter } from "next-auth/adapters";

const adapter: Adapter = PrismaAdapter(prisma)
export const authOptions:AuthOptions = { 
  adapter,
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
   ],
   secret: process.env.NEXTAUTH_SECRET as string,
   pages: {
      signIn: "sign-in",
   },
}



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
