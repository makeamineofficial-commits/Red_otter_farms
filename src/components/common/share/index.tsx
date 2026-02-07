"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link } from "lucide-react";
import { ReactNode, useState } from "react";

import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

export function Share({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const [copied, setCopied] = useState(false);

  const url = href
    ? window?.location.origin + href
    : typeof window !== "undefined"
      ? window?.location.href
      : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:min-w-md rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-left!">
            Share
          </DialogTitle>
        </DialogHeader>

        {/* URL + Copy (YouTube style) */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 overflow-hidden">
          <p className="text-sm text-muted-foreground truncate min-w-0 flex-1">
            {url}
          </p>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <Check className="size-4 text-green-600" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-3">Share via</p>

          <div className="flex gap-6">
            <button
              onClick={shareWhatsapp}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 bg-green-600 rounded-full border flex items-center justify-center ">
                <FaWhatsapp className="size-7 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">WhatsApp</span>
            </button>

            <button
              onClick={shareFacebook}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-12 w-12 bg-blue-700 rounded-full border flex items-center justify-center ">
                <FaFacebookF className="size-7 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">Facebook</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
