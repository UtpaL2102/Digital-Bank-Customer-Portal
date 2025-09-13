import axios from "axios";
export const accountClient = axios.create({
baseURL: (process.env.ACCOUNT_SERVICE_URL || "http://localhost:4002").replace(/\/$/, "") + "/api/v1",
timeout: 8000
});