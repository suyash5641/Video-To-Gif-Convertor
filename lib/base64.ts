export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const { result } = fileReader;
      if (typeof result === "string") {
        resolve(result); // Base64 string
      } else {
        reject(new Error("Failed to convert file to Base64"));
      }
    };

    fileReader.onerror = (event) => {
      reject(
        new Error(
          `File could not be read! Code=${event?.target?.error?.code || -1}`
        )
      );
    };

    fileReader.readAsDataURL(file); // Convert file to Base64
  });
};