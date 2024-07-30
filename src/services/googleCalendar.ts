import { google } from 'googleapis';
import { oauth2ClientInstance } from './googleAuth';

const calendar = google.calendar({ version: 'v3', auth: oauth2ClientInstance });

async function createEvent(event: any) {
  console.log(event)
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

export default {
  createEvent
}
