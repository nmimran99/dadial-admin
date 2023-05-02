import axios from "axios";
import NextAuth, { AuthOptions, DefaultSession, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      authorize: async (credentials, req) => {
        const { username, password } = credentials as {
          username: string;
          password: string;
        }
        const res = await axios.post(`http://localhost:3001/api/auth`, {
          username,
          password
        })
        
       
        if (res.status == 200) {
           console.log("this is running")
          const user = {
            id: res.data._id,
            name: res.data.username,
            email: res.data.token.token
          }
          console.log(user)
          return user;  
        }
        return null
      }

    }),
    
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }): Promise<Session | DefaultSession> {
      session.user.token = session.user.email;
      session.user.email = "";
      return session;
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
}

export default NextAuth(authOptions)