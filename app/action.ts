"use server";
export async function UploadVideoCloudinary(formData: FormData) {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`, // Replace "your_cloud_name"
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Uploaded Video URL:", data.secure_url);
      return data.secure_url;
    } else {
      console.error("Upload Error:", data.error);
      throw new Error(data.error.message || "Failed to upload video");
    }
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error);
    throw error;
  }
}
