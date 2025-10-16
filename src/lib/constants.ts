// Application Constants and Types
// Consolidates: constants.ts + types.ts

// ============================================================================
// Constants
// ============================================================================

// WhatsApp Business Phone Number
export const WHATSAPP_NUMBER = "501XXXXXXX"; // Replace with actual number

// San Pedro Coordinates
export const SAN_PEDRO_CENTER = {
  latitude: 17.9163,
  longitude: -87.9665,
};

// Map Configuration
export const MAP_BOUNDS = {
  north: 17.9300,
  south: 17.9000,
  east: -87.9500,
  west: -87.9800,
};

// ============================================================================
// Application Types
// ============================================================================

export type UserProfile = {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  phone_number: string | null;
  role: 'user' | 'driver';
};

export type LocationPoint = {
  latitude: number;
  longitude: number;
};
