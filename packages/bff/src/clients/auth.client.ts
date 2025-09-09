import axios from "axios";
export const authClient = axios.create({
baseURL: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
timeout: 8000
});