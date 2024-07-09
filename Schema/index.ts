import z from 'zod'

export const LoginSchema = z.object({
    email : z
    .string()
    .email(),
    password : z
    .string()
    .min(2,{message : 'password must be at least 2 characters'})
})

export const RegisterSchema = z.object({
    name : z
    .string()
    .min(3,{message:'name must be at least 2 characters'}),
    email : z
    .string()
    .email(),
    password : z
    .string()
    .min(2,{message : 'password must be at least 2 characters'})
})