import googleCalendar from "../../services/googleCalendar";
import { google } from 'googleapis';

jest.mock('googleapis', () => {
  const mockInsert = jest.fn();

  return {
    google: {
      auth: {
        OAuth2: jest.fn().mockImplementation(() => ({
          setCredentials: jest.fn(),
        })),
      },
      calendar: jest.fn(() => ({
        events: {
          insert: mockInsert,
        },
      })),
    },
  };
});

describe('Google Calendar Service - createEvent', () => {
  const calendarId = 'primary';
  const mockEvent = {
    summary: 'Test Event',
    description: 'Test Event Description',
    start: {
      dateTime: '2024-08-01T10:00:00-03:00',
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: '2024-08-01T11:00:00-03:00',
      timeZone: 'America/Sao_Paulo',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event successfully', async () => {
    const mockResponse = {
      data: { id: 'event-id' },
    };
    const insertMock = google.calendar("v3").events.insert as jest.Mock;
    insertMock.mockResolvedValue(mockResponse);

    const result = await googleCalendar.createEvent(mockEvent);

    expect(insertMock).toHaveBeenCalledWith({
      calendarId,
      requestBody: mockEvent,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error if creating the event fails', async () => {
    const insertMock = google.calendar("v3").events.insert as jest.Mock;
    insertMock.mockRejectedValue(new Error('Failed to create event'));

    await expect(googleCalendar.createEvent(mockEvent)).rejects.toThrow('Failed to create event');
    expect(insertMock).toHaveBeenCalledWith({
      calendarId,
      requestBody: mockEvent,
    });
  });
});
