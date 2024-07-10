import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "@/lib/db"
import { DEFAULT_LOGIN_REDIRECT } from "./routes"

export const { handlers, auth, signIn, signOut } = NextAuth({
    
    adapter : PrismaAdapter(db),
    callbacks:{
        async jwt({token}) {
            console.log("Token", token)
            return token 
        }
    },
    session:{strategy:'jwt'},
...authConfig
})