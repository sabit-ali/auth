'use server'

import * as z from 'zod'
import { LoginSchema } from '@/Schema'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'


export const login = async (values : z.infer<typeof LoginSchema>) =>{
  const validField =  LoginSchema.safeParse(values)

  if(!validField.success){
    return {error : 'Invalid fields'}
  }

  const {email, password} = validField.data

  try {
    await signIn('credentials',{
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return {success : 'Login Success'}
  
  } catch (error:any) {
    if (error instanceof AuthError) {
        switch(error.type){
          case "CredentialsSignin" : 
          return {error : 'Invalid credentials!'}
          default :
          return {error : 'Something went wrong!'}
       }
    } 
    throw error
  }
}