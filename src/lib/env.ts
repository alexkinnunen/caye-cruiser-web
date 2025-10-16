import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("VITE_SUPABASE_URL must be a valid URL"),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(
    1,
    "VITE_SUPABASE_PUBLISHABLE_KEY is required",
  ),
  VITE_MAPBOX_TOKEN: z.string().min(1, "VITE_MAPBOX_TOKEN is required"),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1, "VITE_STRIPE_PUBLISHABLE_KEY is required"),
  VITE_WHATSAPP_NUMBER: z.string().optional(),
});

function validateEnv() {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const errors = result.error.errors.map((err) =>
      `${err.path.join(".")}: ${err.message}`
    ).join("\n");
    throw new Error(`Environment validation failed:\n${errors}`);
  }

  return result.data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
