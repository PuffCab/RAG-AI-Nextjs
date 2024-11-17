import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

const addUserIdToOrganization = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("orgMemberships", {
      orgId: args.orgId,
      userId: args.userId,
    });
  },
});
const deleteUserIdFromOrganization = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const orgMembership = await ctx.db
      .query("orgMemberships")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("orgId", args.orgId).eq("userId", args.userId)
      )
      .first();
    if (orgMembership) {
      await ctx.db.delete(orgMembership._id);
    }
  },
});

export { addUserIdToOrganization, deleteUserIdFromOrganization };
