import { sendBookingNotifications } from './notify';

export interface RoomBookingRequest {
  referenceNumber: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  subtotal: number;
  tax: number;
  total: number;
  guestName: string;
  phone: string;
  email: string;
  note?: string;
  createdAt: string;
}

export interface TableReservationRequest {
  referenceNumber: string;
  date: string;
  servicePeriod: 'Lunch' | 'Dinner';
  timeSlot: string;
  guests: number;
  guestName: string;
  phone: string;
  email: string;
  specialRequest?: string;
  createdAt: string;
}

export interface ContactEnquiry {
  referenceNumber: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

const ROOM_STORAGE_KEY = 'gph_room_requests_v1';
const TABLE_STORAGE_KEY = 'gph_table_requests_v1';
const ENQUIRY_STORAGE_KEY = 'gph_contact_enquiries_v1';

function generateRef(prefix: 'R' | 'T' | 'E'): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `GPH-${prefix}-${num}`;
}

function readList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, items: T[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export async function submitRoomBookingRequest(
  input: Omit<RoomBookingRequest, 'referenceNumber' | 'createdAt'>
): Promise<RoomBookingRequest> {
  const record: RoomBookingRequest = {
    ...input,
    referenceNumber: generateRef('R'),
    createdAt: new Date().toISOString(),
  };

  const existing = readList<RoomBookingRequest>(ROOM_STORAGE_KEY);
  writeList(ROOM_STORAGE_KEY, [record, ...existing]);

  await sendBookingNotifications({
    type: 'room_booking',
    referenceNumber: record.referenceNumber,
    guestName: record.guestName,
    guestEmail: record.email,
    summary: `${record.roomName} (${record.checkIn} to ${record.checkOut}, ${record.nights} nights)`,
  });

  return record;
}

export async function submitTableReservationRequest(
  input: Omit<TableReservationRequest, 'referenceNumber' | 'createdAt'>
): Promise<TableReservationRequest> {
  const record: TableReservationRequest = {
    ...input,
    referenceNumber: generateRef('T'),
    createdAt: new Date().toISOString(),
  };

  const existing = readList<TableReservationRequest>(TABLE_STORAGE_KEY);
  writeList(TABLE_STORAGE_KEY, [record, ...existing]);

  await sendBookingNotifications({
    type: 'table_reservation',
    referenceNumber: record.referenceNumber,
    guestName: record.guestName,
    guestEmail: record.email,
    summary: `Table for ${record.guests} on ${record.date} at ${record.timeSlot} (${record.servicePeriod})`,
  });

  return record;
}

export async function submitContactEnquiry(
  input: Omit<ContactEnquiry, 'referenceNumber' | 'createdAt'>
): Promise<ContactEnquiry> {
  const record: ContactEnquiry = {
    ...input,
    referenceNumber: generateRef('E'),
    createdAt: new Date().toISOString(),
  };

  const existing = readList<ContactEnquiry>(ENQUIRY_STORAGE_KEY);
  writeList(ENQUIRY_STORAGE_KEY, [record, ...existing]);

  await sendBookingNotifications({
    type: 'contact_enquiry',
    referenceNumber: record.referenceNumber,
    guestName: record.name,
    guestEmail: record.email,
    summary: record.subject,
  });

  return record;
}
