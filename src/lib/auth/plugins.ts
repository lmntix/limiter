import { openAPI, organization } from "better-auth/plugins";
import { admin as adminPlugin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { ac, admin, member, owner } from "./permissions";

export const plugins = [
  openAPI(),
  organization({
    ac: ac,
    roles: {
      owner,
      admin,
      member,
    },
    teams: {
      enabled: true,
      maximumTeams: 3, // Optional: limit teams per organization
      allowRemovingAllTeams: false, // Optional: prevent removing the last team
    },
  }),
  adminPlugin({
    impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
  }),
  nextCookies(),
];
