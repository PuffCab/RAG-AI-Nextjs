import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

const addUserIdToOrganization = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("orgMembership", {
      orgId: args.orgId,
      user: args.userId,
    });
  },
});

export { addUserIdToOrganization };
