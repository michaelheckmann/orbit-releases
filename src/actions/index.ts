import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createClient } from "@supabase/supabase-js";

export const server = {
  joinWaitlist: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
    }),
    handler: async ({ email }, context) => {
      const { env } = context.locals.runtime;

      // Apply rate limiting
      const key = context.request.headers.get("cf-connecting-ip") || email;
      const { success } = await env.RATE_LIMITER.limit({ key });
      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);
      // Make sure you have a table with the name "waitlist" and a column "email" in your Supabase database
      const res = await supabase.from("waitlist").insert({ email });

      if (res.error) {
        throw new Error(res.error.message);
      }

      if (res.status !== 201) {
        throw new Error("Failed to join the waitlist");
      }

      return true;
    },
  }),
};
