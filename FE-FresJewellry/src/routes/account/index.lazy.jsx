import React, { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
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
import arswendoImage from "@/assets/Arswendo.jpeg";

export const Route = createLazyFileRoute("/account/")({
  component: Account,
});

function Account() {
  // const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = useState("Armando Yuviano");
  const [nomorTelepon, setNomorTelepon] = useState("+62 897823232");
  const [email] = useState("GhebiCayankDiaCelalu@gmail.com");
  const [address, setAddress] = useState("Tandus Pariaman");

  const handleNamaLengkapChange = (event) => setNamaLengkap(event.target.value);
  const handleNomorTeleponChange = (event) => setNomorTelepon(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleSave = () => {
    console.log({
      namaLengkap,
      nomorTelepon,
      email,
      address,
    });
    toast.success("Data has been saved!");
  };

  const handleLogout = () => {
    toast.success("You have been logged out!");
  };

  return (
    <div className="font-poppins container mx-auto w-[90%] md:w-[70%] px-4 py-8">
      <Toaster />
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-3xl text-center md:text-left">
          <strong>Account</strong>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row mt-[20px]">
        <div className="w-full lg:w-2/6 mb-4 lg:mb-0 flex flex-col items-center">
          <img
            src={arswendoImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-[#CB9531] mb-4"
          />
          <div className="p-6 space-y-4 w-full">
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
                    <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
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
        </div>

        <div className="w-full lg:w-4/6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-[20px] mb-4 font-bold">Profile</h2>
            <div className="mb-4">
              <Label className="text-[#CB9531]">Full Name</Label>
              <Input value={namaLengkap} onChange={handleNamaLengkapChange} />
            </div>
            <div className="mb-4">
              <Label className="text-[#CB9531]">Telephone Number</Label>
              <Input value={nomorTelepon} onChange={handleNomorTeleponChange} />
            </div>
            <div className="mb-4">
              <Label className="text-[#CB9531]">Email</Label>
              <Input value={email} disabled />
            </div>
            <div className="mb-4">
              <Label className="text-[#CB9531]">Address</Label>
              <Input value={address} onChange={handleAddressChange} />
            </div>
            <div className="flex justify-center">
              <Button className="bg-[#CB9531] hover:bg-[#6C4C35] text-white" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
