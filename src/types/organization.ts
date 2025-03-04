import { Organization } from "@/db/schema/auth";

export type UserOrganizationDetails = Organization & {
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
};

export type OrgListForUser = {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  metadata: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  role: string;
};
