import cron from 'node-cron';
import { syncAppointmentsToGoogleCalendar } from './lib/syncAppointments.js';

// Run sync every 60 minutes
cron.schedule('* * * * *', async () => {
    console.log('Running scheduled sync:', new Date().toISOString());
    try {
        await syncAppointmentsToGoogleCalendar();
    } catch (error) {
        console.error('Scheduled sync failed:', error);
    }
});

console.log('Sync scheduler started');