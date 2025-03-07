import React from 'react';
import { Separator } from '@/components/ui/separator';
import { IoNotificationsCircle } from 'react-icons/io5';

export function Notification({ notifications }) {
    return (
        <div className="space-y-4">
            {notifications.map((notif) => (
                <div key={notif.id}>
                    <div
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full mx-auto"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="flex-shrink-0">
                                <IoNotificationsCircle size={25} color="#85986d" />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <span className="text-[#85986d] text-sm font-medium">
                                        {notif.type}
                                    </span>
                                    <span className="text-[#8A8A8A] text-xs sm:text-sm">
                                        {new Date(notif.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>

                                <p className="text-[#4A2E2A] text-base font-semibold mt-1">
                                    {notif.message}
                                </p>

                                <p className="text-[#8A8A8A] text-sm mt-1">
                                    {notif.details}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}