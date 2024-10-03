import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; // Assuming you're using bcryptjs for password hashing
import connect from "@/lib/clientPromise";
import User from "@/app/models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");
        await connect();
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("No user found with the email");
        }
        const isValidPassword = await compare(credentials.password, user.password);
        console.log(isValidPassword);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        console.log(user);
        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
