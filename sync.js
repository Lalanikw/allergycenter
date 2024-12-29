import { syncAppointmentsToGoogleCalendar } from './lib/syncAppointments.js';

syncAppointmentsToGoogleCalendar()
    .then(() => console.log('Sync complete'))
    .catch(err => console.error('Sync failed:', err));
