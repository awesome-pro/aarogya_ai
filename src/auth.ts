import NextAuth, { type DefaultSession }  from "next-auth"
import Providers from "next-auth/providers"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/dbConnect"
import PatientModel from "./models/Patient"
import bcryptjs from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: any) => {

        await dbConnect()

        try {
          
          const patient = await PatientModel.findOne({
            $or: [
              { email: credentials.email },
              { phone: credentials.phoneNumber}
            ]
          })

          if (!patient) {
            console.log("No patient found")
            throw new Error("No patient found")
          }

          const isPasswordCorrect = await bcryptjs.compare(credentials.password, patient.password)
          
          if (!isPasswordCorrect) {
            console.log("Password is incorrect")
            throw new Error("Password is incorrect")
          }

          console.log("Patient found: ", patient, patient._id.toString())

          return patient

        } catch (error) {
          console.log("Error while signIn: ", error)
          throw new Error("Error while signIn")
        }

      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.id = user._id?.toString()
        token.email = user.email
        token.name = user.name || ""

      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token.id?.toString()
        session.user.email = token.email || ""
        
      }
     

     return session
    }
    

  }
})