"use client"

import { bookingSchema } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { useForm } from 'react-hook-form';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const BookingForm = ({ event, availability }) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(bookingSchema) });

    const availableDays = availability.map((day) => new Date(day.date));

    const timeSlots = selectedDate
        ? availability.find(
            (day) => day.date === format(selectedDate, "yyyy-MM-dd")
        )?.slots || []
        : [];

    useEffect(() => {
        if (selectedDate) {
            setValue("date", format(selectedDate, "yyyy-MM-dd"));
        }
    }, [selectedDate, setValue]);

    useEffect(() => {
        if (selectedTime) {
            setValue("time", selectedTime);
        }
    }, [selectedTime, setValue]);

    const onSubmit = async (data) => {
        console.log("Form submitted with data:", data);

        if (!selectedDate || !selectedTime) {
            console.error("Date or time not selected");
            return;
        }
    }

    return (
        <div className="flex flex-col gap-8 p-10 border bg-white">
            <div className="md:h-96 flex flex-col md:flex-row gap-5 ">
                <div className="w-full">
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

                <div className="w-full h-full md:overflow-scroll no-scrollbar">
                    {/* add hide scroll bar code */}
                    {selectedDate && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">
                                Available Time Slot</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                {timeSlots.map((slot) => {
                                    return (
                                        <Button key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            variant={selectedTime === slot ? "default" : "outline"}
                                        >
                                            {slot}
                                        </Button>
                                    )
                                })}</div>
                        </div>
                    )}
                </div>
            </div>
            {selectedTime && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input {...register("name")} placeholder="Your Name" />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="Your Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Textarea
                            {...register("additionalInfo")}
                            placeholder="Additional Information"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Schedule Event
                    </Button>
                </form>
            )}
        </div>
    )
}

export default BookingForm
