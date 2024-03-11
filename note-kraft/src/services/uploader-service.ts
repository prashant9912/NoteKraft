export async function uploadFile(file: File, jwtToken: string) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/upload/file`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to upload file");
    }

    return data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
