import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { EmailMessage } from "cloudflare:email";

const notificationFrom = "waitlist@notify.memorymachine.app";
const notificationTo = "michael@heckmann.app";

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

      const createdAt = new Date().toISOString();
      await env.WAITLIST.put(
        `signup:${crypto.randomUUID()}`,
        JSON.stringify({ email, createdAt }),
      );

      // Send the internal signup notification without delaying the response.
      context.locals.runtime.ctx.waitUntil(
        (async () => {
          try {
            const message = new EmailMessage(
              notificationFrom,
              notificationTo,
              [
                `From: ${notificationFrom}`,
                `To: ${notificationTo}`,
                "Subject: New Waitlist Signup",
                "MIME-Version: 1.0",
                "Content-Type: text/plain; charset=UTF-8",
                "Content-Transfer-Encoding: 8bit",
                "",
                "New user joined the waitlist:",
                `Email: ${email}`,
                `Time: ${createdAt}`,
              ].join("\r\n"),
            );
            await env.WAITLIST_EMAIL.send(message);
          } catch (error) {
            console.error("Failed to send waitlist notification:", error);
          }
        })(),
      );

      return true;
    },
  }),
};
