'use server'

import { RegisterSchema } from '@/Schema'
import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values :z.infer<typeof RegisterSchema>)=>{
   const validetedFields =  RegisterSchema.safeParse(values)

   if(!validetedFields.success){
    return {error : 'Invalid fields'}
   }

   const {email , password, name} = validetedFields.data
   
   const existingEmail = await getUserByEmail(email)

   if(existingEmail){
    return {error:'email is already existed'}
   }

  const hasdPassword = await bcryptjs.hash(password,10)

  await db.user.create({
    data:{
        name,
        email,
        password : hasdPassword,
    }

  })

  return {success : 'User created!'}

}