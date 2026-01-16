// "use server";

// import { imagekit } from "@/lib/imagekit";
// import { AssetType } from "@/types/common";

// export const upload = async (file: File) => {
//   try {
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const isVideo = file.type.startsWith("video");

//     const result = await imagekit.upload({
//       file: buffer,
//       fileName: file.name,
//       useUniqueFileName: true,
//     });

//     const thumbnail = isVideo
//       ? `${result.url}?tr=so-1,w-405,h-720,c-at_max`
//       : result.thumbnailUrl;

//     return {
//       success: true,
//       url: result.url,
//       thumbnail,
//       type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
//     };
//   } catch (error) {
//     console.error("Upload failed:", error);
//     return {
//       success: false,
//       url: null,
//       thumbnail: null,
//       type: null,
//     };
//   }
// };

"use server";

import fs from "fs/promises";
import path from "path";
import { AssetType } from "@/types/common";

export const upload = async (file: File) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const isVideo = file.type.startsWith("video");

    const uploadDir = isVideo
      ? "public/uploads/videos"
      : "public/uploads/images";

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const fileName = `${crypto.randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file locally
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/${uploadDir.replace("public/", "")}/${fileName}`;

    return {
      success: true,
      url: publicUrl,
      thumbnail: isVideo ? publicUrl : publicUrl,
      type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
    };
  } catch (error) {
    console.error("Local upload failed:", error);
    return {
      success: false,
      url: null,
      thumbnail: null,
      type: null,
    };
  }
};
