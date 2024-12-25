import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Load environment variables from .env.local

import { syncAppointmentsToGoogleCalendar } from "./lib/syncAppointments.js";

(async () => {
    try {
        console.log("Starting the sync...");
        await syncAppointmentsToGoogleCalendar();
        console.log("Sync completed successfully!");
    } catch (error) {
        console.error("Sync failed:", error);
    }
})();

console.log("MONGODB_URI:", process.env.MONGODB_URI);


