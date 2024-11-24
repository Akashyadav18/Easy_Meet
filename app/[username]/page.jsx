import { getUserByUsername } from '@/actions/users';
import EventCard from '@/components/EventCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { notFound } from 'next/navigation';
import React from 'react'

const UserPage = async ({ params }) => {

    const user = await getUserByUsername(params.username);
    if (!user) {
        notFound();
    }


    return (
        <div className='container mx-auto px-4 py-10'>
            <div className='flex flex-col items-center mb-10'>
                <Avatar className="w-24 h-24 mb-4" >
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className='text-3xl font-bold mb-2'>{user.name}</h1>
                <p className='text-gray-500 text-center text-xl'>
                    Welcome to my scheduling page. Please select your event below to book a call with me.
                </p>
            </div>
            {user.events.length === 0 ? (
                <p className='text-center text-gray-600 text-2xl'>No Public Events is Available</p>
            ) : (
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto'>
                    {user.events.map((event) => {
                        return(
                            <EventCard 
                                key={event.id}
                                event={event}
                                username={params.username}
                                isPublic
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default UserPage
