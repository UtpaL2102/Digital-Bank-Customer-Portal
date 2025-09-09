import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
api_key: process.env.CLOUDINARY_API_KEY!,
api_secret: process.env.CLOUDINARY_API_SECRET!,
secure: true,
});
return cloudinary;
}

export function signViewUrl(publicId: string, ttlSeconds = 300) {
const expires_at = Math.floor(Date.now() / 1000) + ttlSeconds;
// Authenticated delivery requires sign_url + type='authenticated'
return cloudinary.url(publicId, {
type: "authenticated",
sign_url: true,
expires_at,
transformation: [{ width: 1000, crop: "limit" }]
});
}