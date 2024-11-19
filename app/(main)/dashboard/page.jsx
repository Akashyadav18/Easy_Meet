"use client";

import { useUser } from '@clerk/nextjs';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { UsernameSchema } from '@/app/lib/validators';
import useFetch from '@/hooks/use-fetch';
import { updateUsername } from '@/actions/users';
import { BarLoader } from 'react-spinners';

const Dashboard = () => {

    const { isLoaded, user } = useUser();
    console.log("users: ", user);


    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(UsernameSchema),
    })

    useEffect(() => {
        setValue("username", user?.username)
    }, [isLoaded])

    const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername)

    const onSubmit = async (data) => {
        fnUpdateUsername(data.username)
    };

    return (
        <div className='space-y-8'>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName}</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-3'>
                                <span>{typeof window !== "undefined" ? window.location.origin : ""}/</span>

                                <Input {...register("username")} placeholder="Username" />
                            </div>
                            {/* for Form */}
                            {errors.username &&
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.username.message}
                                </p>}
                            {/* for API */}
                            {error && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {error?.message}
                                </p>
                            )}
                        </div>
                        {loading && (<BarLoader className='mb-3' width={"100%"} color='#36d7b7' />)}
                        <Button type="submit">Update Username</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
