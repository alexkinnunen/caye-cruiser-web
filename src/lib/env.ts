import { z } from "zod";

// In development, make all env vars optional for easier setup
// In production, these will be required
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("VITE_SUPABASE_URL must be a valid URL").optional(),
  VITE_SUPABASE_ANON_KEY: z.string().optional(),
  VITE_MAPBOX_TOKEN: z.string().optional(),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_WHATSAPP_NUMBER: z.string().optional(),
});

function validateEnv() {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const errors = result.error.errors.map((err) =>
      `${err.path.join(".")}: ${err.message}`
    ).join("\n");

    // In development, just warn - don't break the app
    if (import.meta.env.DEV) {
      console.warn(`⚠️  Environment validation warnings:\n${errors}`);
      console.warn("💡 Copy .env.example to .env.local and add your API keys when ready");
      return import.meta.env as z.infer<typeof envSchema>;
    }

    // In production, throw error
    throw new Error(`Environment validation failed:\n${errors}`);
  }

  // Warn about missing optional vars in development
  if (import.meta.env.DEV) {
    const warnings: string[] = [];
    if (!result.data.VITE_SUPABASE_URL) warnings.push("VITE_SUPABASE_URL");
    if (!result.data.VITE_SUPABASE_ANON_KEY) warnings.push("VITE_SUPABASE_ANON_KEY");
    if (!result.data.VITE_MAPBOX_TOKEN) warnings.push("VITE_MAPBOX_TOKEN");
    if (!result.data.VITE_STRIPE_PUBLISHABLE_KEY) warnings.push("VITE_STRIPE_PUBLISHABLE_KEY");

    if (warnings.length > 0) {
      console.warn(`⚠️  Missing environment variables: ${warnings.join(", ")}`);
      console.warn("💡 Some features may not work until you configure them in .env.local");
    }
  }

  return result.data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
