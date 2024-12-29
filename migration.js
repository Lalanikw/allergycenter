import dbConnect from './lib/mongodb.js';
import { Appointment } from './lib/syncAppointments.js';  

async function updateExistingAppointments() {
    try {
        await dbConnect();
        console.log('Connected to database');

        const result = await Appointment.updateMany(
            { synced: { $exists: false } },  // Find appointments without synced field
            { 
                $set: { 
                    synced: false,
                    googleEventId: null 
                } 
            }
        );

        console.log(`Updated ${result.modifiedCount} appointments`);
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

updateExistingAppointments();