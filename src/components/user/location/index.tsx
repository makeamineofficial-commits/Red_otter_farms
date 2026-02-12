"use client";

import React, { useEffect, useState } from "react";
import {
  updateLocation,
  askForLocation,
} from "@/actions/user/location/index.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type City = {
  label: string;
  isNCR?: boolean;
  aliases?: string[];
};

const NCR_CITIES: City[] = [
  {
    label: "Delhi-NCR",
    isNCR: true,
    aliases: ["Faridabad", "Noida", "Gurgaon"],
  },
];

const OTHER_CITIES: City[] = [
  { label: "Mumbai" },
  { label: "Kochi" },
  { label: "Bengaluru" },
  { label: "Hyderabad" },
  { label: "Chandigarh" },
  { label: "Ahmedabad" },
  { label: "Pune" },
  { label: "Chennai" },
  { label: "Kolkata" },
];

export default function LocationPicker() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const ask = await askForLocation();
      console.log(ask);
      if (ask) setOpen(true);
    })();
  }, []);

  const handleCitySelect = async (city: City) => {
    await updateLocation(!!city.isNCR);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-white text-xs cursor-pointer">
          Select Location
        </span>
      </DialogTrigger>
      <DialogContent className="lg:w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Your City</DialogTitle>
          <DialogDescription>
            Including Faridabad, Noida, Gurugram in NCR
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <h3 className="font-medium mb-2">Popular Cities</h3>
          <div className="grid grid-cols-3 gap-2">
            {NCR_CITIES.concat(OTHER_CITIES).map((city) => (
              <button
                key={city.label}
                onClick={() => handleCitySelect(city)}
                className={`p-2 border rounded text-center hover:bg-gray-100 ${
                  city.isNCR ? "font-bold text-maroon" : ""
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
