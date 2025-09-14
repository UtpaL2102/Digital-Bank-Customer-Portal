// test-sign.js (run with node, ensure CLOUDINARY_* env vars are set)
import cloudinary from "cloudinary";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ override: true });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function createSignedRawPdf(publicId, expiresIn = 300) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const timestamp = Math.floor(Date.now() / 1000) + expiresIn;

  // IMPORTANT: publicId must be the raw string (with '/'), NOT URL encoded
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(stringToSign + apiSecret).digest("hex");

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/download?public_id=${encodeURIComponent(publicId)}&timestamp=${timestamp}&signature=${signature}&api_key=${apiKey}&resource_type=raw&format=pdf`;
  return url;
}

const publicId = "statements/4f28cc7e-69c0-40ef-9a06-f35bdbfc182e"; // <-- raw public id
console.log(createSignedRawPdf(publicId, 300));
