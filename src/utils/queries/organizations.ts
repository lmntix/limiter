import { eq, and } from "drizzle-orm";
import { organizations, orgMembers, users } from "../../db/schema/auth";
import { OrgListForUser, UserOrganizationDetails } from "@/types/organization";
import db from "../../db/index";

export async function getUserOrgDetails(
  userId: string,
  organizationId: string
): Promise<UserOrganizationDetails | null> {
  const result = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      logo: organizations.logo,
      metadata: organizations.metadata,
      createdAt: organizations.createdAt,
      updatedAt: organizations.updatedAt,
      role: orgMembers.role,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        role: users.role,
        banned: users.banned,
        banReason: users.banReason,
        banExpires: users.banExpires,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      },
    })
    .from(organizations)
    .innerJoin(
      orgMembers,
      and(
        eq(organizations.id, orgMembers.organizationId),
        eq(orgMembers.organizationId, organizationId),
        eq(orgMembers.userId, userId)
      )
    )
    .innerJoin(users, eq(orgMembers.userId, users.id))
    .execute();
  return result.length > 0 ? result[0] : null;
}

export async function getOrgListForUser(
  userId: string
): Promise<OrgListForUser[]> {
  const result = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      logo: organizations.logo,
      metadata: organizations.metadata,
      createdAt: organizations.createdAt,
      updatedAt: organizations.updatedAt,
      role: orgMembers.role,
    })
    .from(organizations)
    .innerJoin(
      orgMembers,
      and(
        eq(organizations.id, orgMembers.organizationId),
        eq(orgMembers.userId, userId)
      )
    )
    .execute();
  return result;
}
