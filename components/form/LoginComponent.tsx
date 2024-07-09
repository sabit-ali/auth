'use client'

import { login } from '@/actions/loginAction'
import { LoginSchema } from '@/Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../Messages/FormError'
import FormSuccess from '../Messages/FormSuccess'
import { redirect } from 'next/navigation'

export default function LoginComponent() {
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            await login(values)
                .then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
        
       
    }
    return (
        <div className=' max-w-6xl sm:w-full '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder=".email@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder=" ******** " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                                                        <FormError message={error} />
                                                        <FormSuccess message = {success} />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    )
}
