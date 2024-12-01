"use client"

import { bookingSchema } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { useForm } from 'react-hook-form';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';

const BookingForm = ({ event, availability }) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const { register, handleSubmit, formState: { error } } = useForm({ resolver: zodResolver(bookingSchema) });

    const availableDays = availability.map((day) => new Date(day.date));

    const timeSlots = selectedDate
        ? availability.find(
            (day) => day.date === format(selectedDate, "yyyy-MM-dd")
        )?.slots || []
        : [];

    return (
        <div>
            <div>
                <div>
                    <DayPicker mode='single' selected={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            selectedTime(null);
                        }}
                        disabled={[{ before: new Date() }]}
                        modifiers={{ available: availableDays }}
                        modifiersStyles={{
                            available: {
                                background: "lightblue",
                                borderRadius: 100,
                            },
                        }}
                    />
                </div>

                

            </div>
            <div></div>
        </div>
    )
}

export default BookingForm
