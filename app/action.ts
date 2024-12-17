"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
type UploadResult =
  | { success: UploadApiResponse; error?: never }
  | { error: string; success?: never };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function UploadVideoCloudinary(formData: FormData) {
  try {
    const blob = formData.get("file") as Blob;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<UploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (error || !result) {
            console.error("Upload failed:", error);
            reject({ error: "Upload failed" });
          } else {
            console.log("Upload successful:", result);
            resolve({ success: result });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return { error: "Error processing file" };
  }
}
