import NextAuth, { AuthError } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { User } from "@/models/user"
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

        const { email, password } = credentials


        if (!email || !password) throw new CredentialsSignin("provide both email and password")

        await connectdb() // connect to database

        const user = await User.findOne({ email: email }).select("+password") // select password field which is hidden by default

        if (!user) throw new CredentialsSignin("invalid credentials")

        if (!user.password) throw new CredentialsSignin("invalid credentials")

        const isMatch = await compare(password, user.password)

        if (!isMatch) throw new CredentialsSignin("invalid credentials")

        // if(!user.isverified) throw new CredentialsSignin("email not verified")

        return { email: user.email, name: user.name, id: user._id }

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
          return true
        } catch (error) {
          throw new AuthError("error while signing in")
        }
      }

      else return false;


    }

  }
}) 