export interface OrganizationInvites {
  invitations: {
    id: string;
    email: string;
    status: "pending" | "accepted" | "rejected" | "canceled";
    expiresAt: Date;
    organizationId: string;
    role: string;
    inviterId: string;
  }[];
  logo?: string | null | undefined;
  name: string;
  id: string;
}
