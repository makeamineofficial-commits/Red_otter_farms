import { AssetType, PreviewFile } from "@/types/common";
import React, { useCallback, useRef } from "react";
import { upload } from "@/actions/image/upload.action";
import { toast } from "sonner";
import { X, UploadCloud, ImageIcon, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: PreviewFile[];
  onChange: (value: PreviewFile[]) => void;
  limit?: number;
};

export default function FileUpload({ value, onChange, limit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []);
      if (!selected.length) return;

      const remaining =
        typeof limit === "number"
          ? Math.max(limit - value.length, 0)
          : Infinity;

      if (remaining <= 0) {
        toast.warning(`You can upload up to ${limit} files only`);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      const filesToUpload = selected.slice(0, remaining);

      if (selected.length > remaining) {
        toast.warning(`Only ${remaining} more file(s) allowed`);
      }

      const uploadedFiles: PreviewFile[] = [];

      try {
        for (const file of filesToUpload) {
          const isVideo = file.type.startsWith("video");
          const sizeLimit = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;

          if (file.size > sizeLimit) {
            toast.warning(
              isVideo ? "Video must be under 25MB" : "Image must be under 5MB",
            );
            continue;
          }

          const uploaded = await upload(file);
          if (!uploaded?.url) {
            toast.error("Upload failed");
            continue;
          }

          uploadedFiles.push({
            url: uploaded.url,
            thumbnail: uploaded.thumbnail,
            type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
          });
        }

        if (uploadedFiles.length) {
          onChange([...value, ...uploadedFiles]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Upload error");
      } finally {
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [value, onChange, limit],
  );

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const isLimitReached = typeof limit === "number" && value.length >= limit;

  return (
    <div className="space-y-3 overflow-hidden">
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center",
          isLimitReached
            ? "cursor-not-allowed opacity-50"
            : "hover:border-primary cursor-pointer transition",
        )}
        onClick={() => {
          if (!isLimitReached) inputRef.current?.click();
          else toast.warning(`Maximum ${limit} files allowed`);
        }}
      >
        <UploadCloud className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Click to upload images or videos
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Images ≤ 5MB • Videos ≤ 25MB
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {value.length > 0 && (
        <div className="">
          <div className="flex gap-3 rounded-md border p-2 overflow-auto">
            {value.map((item, index) => (
              <div
                key={index}
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-md border"
              >
                {item.type === AssetType.IMAGE ? (
                  <img
                    src={item.thumbnail ?? item.url}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute bottom-1 left-1 rounded bg-black/70 p-1 text-white">
                  {item.type === AssetType.IMAGE ? (
                    <ImageIcon size={12} />
                  ) : (
                    <VideoIcon size={12} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={cn(
                    "absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white",
                    "opacity-0 group-hover:opacity-100 transition",
                  )}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
