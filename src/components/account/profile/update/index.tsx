import React from "react";
import AccountBreadcrumb from "../../breadcrumb";
import ProfileForm from "./form";
import { Button } from "@/components/ui/button";
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

      <ProfileForm></ProfileForm>
    </>
  );
}
