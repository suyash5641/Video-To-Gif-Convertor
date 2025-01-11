"use server";
import { v2 as cloudinary } from "cloudinary";

export async function CloudinarySignature() {
  try {
    const timestamp = Math.round((Date.now() + 3 * 60 * 1000) / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_SECRET as string
    );

    return { signature, timestamp };
  } catch {
    return { signature: "", timestamp: 0 };
  }
}
