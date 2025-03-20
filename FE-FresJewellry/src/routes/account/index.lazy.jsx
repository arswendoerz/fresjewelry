import React, { useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { TbLogout } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";

export const Route = createLazyFileRoute("/account/")({
  component: Account,
});

function Account() {
  const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = useState("Harry");
  const [nomorTelepon, setNomorTelepon] = useState("+62 897823232");
  const [email, setEmail] = useState("Johndoe@gmail.com");

  const handleNamaLengkapChange = (event) => setNamaLengkap(event.target.value);
  const handleNomorTeleponChange = (event) =>
    setNomorTelepon(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSave = () => {
    console.log({
      namaLengkap,
      nomorTelepon,
      email,
    });
    toast.success("Data has been saved locally!");
  };

  // Handle logout
  const handleLogout = () => {
    toast.success("You have been logged out!");
    //navigate({ to: '/' });
  };

  return (
    <div className="font-poppins container mx-auto w-[90%] md:w-[70%] px-4 py-8">
      <Toaster />
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-3xl text-center md:text-left">
          <strong>Account</strong>
        </h1>
      </div>
      <div
        className="flex-1 bg-[#CB9531] text-white p-4 rounded-xl mb-4 flex items-center h-16"
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

      <div className="flex flex-col lg:flex-row mt-[20px]">
        <div className="w-full lg:w-2/6 mb-4 lg:mb-0">
          <div className="p-6 space-y-4">
            <div className="flex items-center mb-4">
              <FiEdit3 className="cursor-pointer mr-2 w-6 h-6 text-[#CB9531]" />
              <span>Change Profile</span>
            </div>
            <Separator orientation="horizontal" className="w-full h-[1px]" />
            <div className="flex items-center mb-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <TbLogout className="cursor-pointer mr-2 w-6 h-6 text-[#CB9531]" />
                    <span>Log Out</span>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Sign out of your account?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-500 hover:bg-red-800 hover:text-white text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#CB9531] hover:bg-[#6C4C35] text-white"
                      onClick={handleLogout}
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Separator orientation="horizontal" className="w-full h-[1px]" />
          </div>
          <div className="flex justify-center">
            <p className="text-[#8A8A8A] text-xs">Version 1.1.0</p>
          </div>
        </div>

        <div className="w-full lg:w-4/6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-[20px] mb-4 font-bold">Profile</h2>
            <div className="mb-4 bg-[#CB9531] rounded-t-lg">
              <p className="text-white px-[16px] py-[8px]">Personal Data</p>
            </div>
            <div className="px-[16px]">
              <div className="mb-4">
                <Label className="text-[#CB9531]">Full Name</Label>
                <Input
                  className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                  placeholder="Nama Lengkap"
                  value={namaLengkap}
                  onChange={handleNamaLengkapChange}
                />
              </div>

              <div className="mb-4">
                <Label className="text-[#CB9531]">Telephone Number</Label>
                <Input
                  className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                  placeholder="Nomor Telepon"
                  value={nomorTelepon}
                  onChange={handleNomorTeleponChange}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="email" className="text-[#CB9531]">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={true}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-gradient-to-r from-[#6C4C35] to-[#CB9531] hover:from-[#CB9531] hover:to-[#6C4C35] text-white w-[150px] h-[48px] 
                  rounded-xl shadow-md hover:shadow-xl border border-[#9ba987]/50 font-semibold text-[16px] transition-all duration-500 ease-in-out 
                  transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#85986d] focus:ring-opacity-50"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
