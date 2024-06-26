import NextAuth, { AuthError } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { User } from "@/models/user"
import { ZodError } from "zod"
import { signInSchema } from "@/components/formzod.js"
import { compare } from "bcryptjs";
import { connectdb } from "@/components/connectdb.js"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          if (!email || !password) {
            throw new CredentialsSignin("Please provide both email and password");
          }

          await connectdb(); // Connect to the database

          const user = await User.findOne({ email: email }).select("+password"); // Select password field which is hidden by default

          if (!user || !user.password) {
            throw new CredentialsSignin("Invalid credentials");
          }

          const isMatch = await compare(password, user.password);

          if (!isMatch) {
            throw new CredentialsSignin("Invalid credentials");
          }

          return { email: user.email, name: user.name, id: user._id };
        } catch (error) {
          if (error instanceof ZodError) {
            return null; // Return null to indicate failure
          }
          throw error; // Rethrow other errors
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        try {
          return true
        } catch (error) {
          throw new AuthError("error while signing in")
        }
      }
      else if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user
          await connectdb()
          const alreadyUser = await User.findOne({ email: email })
          
        if (!alreadyUser) {
            await User.create({ email, name, image, googleId: id })
          }
           else if(!alreadyUser.googleId){
            alreadyUser.googleId = id
            await alreadyUser.save()
           }          
          return true
        } catch (error) {
          throw new AuthError("error while signing in")
        }
      }
      else if (account?.provider === "github") {
        try {
          const { email, name, image, id } = user
          await connectdb()
          const alreadyUser = await User.findOne({ email: email })
          if (!alreadyUser) {
            await User.create({ email, name, image, githubId: id })
          }
          else if(!alreadyUser.githubId){
            alreadyUser.githubId = id
            await alreadyUser.save()
           }
          return true
      } catch (error) {
          throw new AuthError("error while signing in")
        }
      }

      else return false;


    }

  }
});
