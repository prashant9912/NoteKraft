import { Request, Response } from "express";
import AWS from "aws-sdk";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME ?? "",
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read",
    };

    const data = await s3.upload(params).promise();

    const url = data.Location;
    res.status(200).json({ message: "File uploaded successfully", url: url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
