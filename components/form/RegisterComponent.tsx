'use client'

import { login } from '@/actions/loginAction'
import { LoginSchema, RegisterSchema } from '@/Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../Messages/FormError'
import FormSuccess from '../Messages/FormSuccess'
import { register } from '@/actions/registerAction'

export default function RegisterComponent() {
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name : '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')

        startTransition(async () => {
            await register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
    return (
        <div className=' max-w-6xl sm:w-full '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder=".email@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <FormError message={error} />
                                    <FormSuccess message = {success} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    )
}
