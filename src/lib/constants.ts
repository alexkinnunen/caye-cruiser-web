// Application Constants and Types
// Consolidates: constants.ts + types.ts

// ============================================================================
// Constants
// ============================================================================

// WhatsApp Business Phone Number
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "501XXXXXXX";

// San Pedro Coordinates
export const SAN_PEDRO_CENTER = {
  latitude: 17.9163,
  longitude: -87.9665,
};

// Map Configuration
export const MAP_BOUNDS = {
  north: 17.93,
  south: 17.9,
  east: -87.95,
  west: -87.98,
};

// ============================================================================
// Application Types
// ============================================================================

export type UserProfile = {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  phone_number: string | null;
  role: "user" | "driver";
};

export type LocationPoint = {
  latitude: number;
  longitude: number;
};
