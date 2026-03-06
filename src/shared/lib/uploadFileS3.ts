export const uploadFileToS3 = async (uploadUrl: string, file: File) => {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
};
