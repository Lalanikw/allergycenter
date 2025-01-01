import { NextResponse } from 'next/server';
import { syncAppointmentsToGoogleCalendar } from '../../../lib/syncAppointments';

export async function POST() {
    try {
        //Process sync asynchronously

        await syncAppointmentsToGoogleCalendar();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json(
            { error: 'Failed to sync appointments' },
            {status: 500}
        )
    }
}