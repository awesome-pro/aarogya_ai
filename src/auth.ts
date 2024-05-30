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
      id: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email"},
        phoneNumber: { label: "Phone Number", type: "tel" }
      },
      authorize: async (credentials: any) => {

        console.log("Credentials: ", credentials)
        console.log("email: ", credentials.email)
        console.log("phoneNumber: ", credentials.phoneNumber)
        console.log("password: ", credentials)
        console.log("password: ", credentials.password)

        await dbConnect()

        try {
          
          const patient = await PatientModel.findOne({
            $or: [
              { email: credentials.email },
        
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
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
    verifyRequest: "/auth/verify-request",
    newUser: "/sign-up",
    signOut: "/sign-out",
    
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user}) {
      //console.log("Token in jwt: ", token, user)
      if (user) {
        token.id = user._id?.toString()
        token.email = user.email || ""
        token.name = user.name || ""

      }
     // console.log("Token in jwt after: ", token)
      return token
    },
    async session({ session, token }) {

      //console.log("Token in session: ", token)
      if (token) {
        session.user._id = token.id?.toString()
        session.user.email = token.email || ""
        session.user.name = token.name || ""
       
      }

     //console.log("Session: ", session)

     return session
    }
    

  }
})