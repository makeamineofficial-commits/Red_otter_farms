import * as React from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);

  const resolvedType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <span className="relative">
      <input
        type={resolvedType}
        data-slot="input"
        className={cn(
          "font-area placeholder:font-area file:text-foreground placeholder:text-muted-foreground",
          "selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base",
          "shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      {type === "password" && (
        <Eye
          className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground"
          onClick={() => setShowPassword((v) => !v)}
        />
      )}
    </span>
  );
}

export { Input };
