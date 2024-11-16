import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

// HTTP actions can be defined inline...
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    //when clerks webhook hits this endpoint, we need to get the conection string in the headers.
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result: WebhookEvent = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      switch (result.type) {
        case "organizationMembership.created":
          await ctx.runMutation(
            internal.orgMembership.addUserIdToOrganization,
            {
              tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
              orgId: result.data.organization.id,
              role: result.data.role === "org:admin" ? "admin" : "member",
            }
          );
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
