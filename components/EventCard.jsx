"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Link, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'
import { deleteEvent } from '@/actions/events'

const EventCard = ({ event, username, isPublic = false }) => {

    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/${username}/${event.id}`
            );
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Fail to copy :", error);
        }
    }

    const {loading, fn: fnDeleteEvent} = useFetch(deleteEvent);

    const handleDelete = async () => {
        if(window?.confirm("Are you sure you want to delete this Event." )){
            await fnDeleteEvent(event.id);
            router.refresh();
        }
    }

    const handleClick = (e) => {
        if(e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG"){
            window?.open(
                `${window?.location.origin}/${username}/${event.id}`,
                "_blank"
            )
        }
    }

    return (
        <Card className="flex flex-col justify-between cursor-pointer" onClick={handleClick}>
            <CardHeader>
                <CardTitle className="text-2xl text-center ">{event.title}</CardTitle>
                <CardDescription className="flex justify-around">
                    <span>
                        {event.duration} mins | {event.isPrivate ? 'private' : 'public'}
                    </span>
                    <span>
                        {event._count.bookings} Booking
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{event.description.substring(0, event.description.indexOf("."))}</p>
            </CardContent>
            {!isPublic &&
                <CardFooter className="flex gap-4">
                    <Button variant="outline" onClick={handleCopy}> <Link className='mr-1 h-4 w-4'/>{isCopied ? "Copied!" : "Copy Link"}</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}> <Trash2 className='mr-1 h-4 w-4'/>{loading ? "Deleting..." : "Delete"}</Button>
                </CardFooter>
            }
        </Card>

    )
}

export default EventCard
