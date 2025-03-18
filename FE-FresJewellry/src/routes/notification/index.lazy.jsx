import * as React from 'react';
import { useState } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Notification as Notifications } from '../../components/Notification/index';
import { TbArrowsUpDown } from "react-icons/tb";

export const Route = createLazyFileRoute('/notification/')({
  component: Notification,
});

function Notification() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('latest');

  const notifications = [
    {
      id: 1,
      type: 'Promotion',
      message: 'Get 20% Discount on Exclusive Ronce Bracelet Collection!',
      details: 'Use code FRE20 at checkout. Valid until the end of this month.',
      date: '2025-03-06T10:00:00Z',
    },
    {
      id: 2,
      type: 'Reminder',
      message: 'Your order is being processed!',
      details: 'Your custom Ronce Bracelet will be shipped soon. Check status in your profile.',
      date: '2025-03-05T14:30:00Z',
    },
    {
      id: 3,
      type: 'News',
      message: 'New Fres Jewelry Collection Has Launched!',
      details: 'Check out our latest exclusive bracelets with Ronce beads.',
      date: '2025-03-03T09:15:00Z',
    },
    {
      id: 4,
      type: 'Notification',
      message: 'Limited Edition Ronce Bracelet Stock Almost Gone!',
      details: 'Order now before it runs out.',
      date: '2025-03-01T16:45:00Z',
    },
    {
      id: 5,
      type: 'Promotion',
      message: 'Buy 2 Bracelets, Get Free Shipping!',
      details: 'Only for Ronce bracelet purchases this month.',
      date: '2025-02-28T11:20:00Z',
    },
    {
      id: 6,
      type: 'Reminder',
      message: 'Don’t forget to claim your reward points!',
      details: 'Redeem points for discounts on your next bracelet purchase.',
      date: '2025-02-25T08:30:00Z',
    },
    {
      id: 7,
      type: 'News',
      message: 'Fres Jewelry at Jewelry Fair 2025!',
      details: 'Visit our booth to see the Ronce collection in person.',
      date: '2025-02-20T13:00:00Z',
    },
    {
      id: 8,
      type: 'Notification',
      message: 'Your payment has been confirmed.',
      details: 'Your Ronce Bracelet will be processed soon.',
      date: '2025-02-18T09:45:00Z',
    },
  ];

  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  return (
    <div className="font-poppins container mx-auto w-[90%] md:w-[70%] px-4 py-8">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-3xl text-black text-center md:text-left">
          <strong>Notifications</strong>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <div
          className="flex-1 bg-[#85986d] text-white p-4 rounded-xl mb-4 md:mb-0 flex items-center h-16 cursor-pointer"
          onClick={() => navigate({ to: `/` })}
        >
          <img
            src="/fi_arrow-left.svg"
            alt="back-button"
            className="cursor-pointer mr-2"
          />
          <span className="text-[16px]">
            <strong>Home</strong>
          </span>
        </div>

        <div className="w-full md:w-auto flex justify-center items-center">
          <Select
            className="border border-[#85986d] rounded-3xl"
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full md:w-auto border-[#85986d] rounded-3xl text-[#4A2E2A]">
              <TbArrowsUpDown size={25} color="#85986d" />
              <SelectValue className="text-[#85986d]" placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="text-[#85986d] bg-white border border-[#85986d] rounded-xl">
              <SelectGroup>
                <SelectItem
                  value="latest"
                  className="flex items-center focus:bg-[#85986d] text-[#85986d] focus:text-white"
                >
                  Latest
                </SelectItem>
                <Separator orientation="horizontal" className="w-full" />
                <SelectItem
                  value="oldest"
                  className="flex items-center focus:bg-[#85986d] text-[#85986d] focus:text-white"
                >
                  Oldest
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Container Scroll*/}
      <div className="w-full mt-4 max-h-[500px] overflow-y-auto pr-2">
        <Notifications notifications={sortedNotifications} />
      </div>
    </div>
  );
}
