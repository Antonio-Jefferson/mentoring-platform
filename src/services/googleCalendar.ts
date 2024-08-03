import { google } from 'googleapis';
import { oauth2ClientInstance } from './googleAuth';

const calendar = google.calendar({ version: 'v3', auth: oauth2ClientInstance });

async function createEvent(event: any) {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createEvent
}
