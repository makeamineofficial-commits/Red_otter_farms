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

  /* ---------------- Upload Handler ---------------- */

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
        inputRef.current!.value = "";
        return;
      }

      const filesToUpload = selected.slice(0, remaining);

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

          const isFirst = value.length === 0 && uploadedFiles.length === 0;

          uploadedFiles.push({
            url: uploaded.url,
            thumbnail: uploaded.thumbnail,
            type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,

            // ⭐ New fields
            isPrimary: isFirst,
            position: value.length + uploadedFiles.length,
          });
        }

        if (uploadedFiles.length) {
          const updated = [...value, ...uploadedFiles];

          onChange(recalculatePositions(updated));
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

  /* ---------------- Helpers ---------------- */

  const recalculatePositions = (files: PreviewFile[]) => {
    return files.map((file, index) => ({
      ...file,
      position: index,
    }));
  };

  const setPrimary = (index: number) => {
    const updated = value.map((file, i) => ({
      ...file,
      isPrimary: i === index,
    }));

    onChange(updated);
  };

  const removeFile = (index: number) => {
    let updated = value.filter((_, i) => i !== index);

    // If removed primary → make first one primary
    if (!updated.some((f) => f.isPrimary) && updated.length) {
      updated[0].isPrimary = true;
    }

    onChange(recalculatePositions(updated));
  };

  const isLimitReached = typeof limit === "number" && value.length >= limit;

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-3 overflow-hidden">
      {/* Upload Box */}
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

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {value.length > 0 && (
        <div className="flex gap-3 rounded-md border p-2 overflow-auto">
          {value.map((item, index) => (
            <div
              key={index}
              className="group relative w-28 shrink-0 rounded-md border p-1"
            >
              {/* Media */}
              <div className="relative h-24 w-24 overflow-hidden rounded-md">
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

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Type Icon */}
              <div className="absolute top-1 left-1 rounded bg-black/70 p-1 text-white">
                {item.type === AssetType.IMAGE ? (
                  <ImageIcon size={12} />
                ) : (
                  <VideoIcon size={12} />
                )}
              </div>

              {/* Primary Checkbox */}
              <label className="mt-1 flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={item.isPrimary}
                  onChange={() => setPrimary(index)}
                  className="h-3 w-3"
                />
                Primary
              </label>

              {/* Position */}
              <p className="text-[10px] text-muted-foreground">
                Position: {item.position}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
