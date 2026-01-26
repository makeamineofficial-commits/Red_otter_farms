"use client";

import { CircleUserRound, X } from "lucide-react";
import { useState } from "react";
import { isValidateUser } from "@/actions/auth/user.action";
import { useRouter } from "next/navigation";
import LoginForm from "./form";
export default function Login() {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  return (
    <>
      <CircleUserRound
        className="stroke-1 stroke-red-500 size-9 cursor-pointer"
        onClick={async () => {
          const user = await isValidateUser();
          if (user) push("/account");
          else setOpen(true);
        }}
      />

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-72 md:w-96 bg-white shadow-2xl z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="font-semibold">SIGN IN</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* content */}
        <LoginForm></LoginForm>
      </div>
    </>
  );
}
