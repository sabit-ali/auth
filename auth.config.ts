
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/Schema"
import { getUserByEmail } from "./data/user"
import bcrypt from 'bcryptjs'

export default { 
    providers: [
        Credentials({
            async authorize(credentials){  
                const validetedFields =  LoginSchema.safeParse(credentials)

               if(validetedFields.success){
               const {email,password} = validetedFields.data

               const user = await getUserByEmail(email)
               if(!user || !user.password) return null;

               const passwordIsMatch = await bcrypt.compare(password,user.password)
                if(passwordIsMatch) return user
               }
               return null
            }
        })
    ] 

} satisfies NextAuthConfig