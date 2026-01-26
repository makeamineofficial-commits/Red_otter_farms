import React from "react";
import AccountBreadcrumb from "../../breadcrumb";
import ProfileForm from "./form";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/store/user/account.store";
export default function UpdateProfile() {

  return (
    <>
      <div>
        <AccountBreadcrumb>Profile</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Your farming journey at a glance
        </p>
      </div>
      <div className="p-4 flex gap-5 xl:gap-20 xl:flex-row flex-col-reverse items-center sm:items-start">
        <ProfileForm></ProfileForm>

        <div className="flex gap-2 items-center flex-col ">
          <div className="w-56 h-56  border rounded-full border-black"></div>

          <Button
            variant={"outline"}
            className="border-maroon rounded-full text-maroon hover:text-white! bg-white! hover:bg-maroon!"
          >
            Change Photo
          </Button>
        </div>
      </div>
    </>
  );
}
