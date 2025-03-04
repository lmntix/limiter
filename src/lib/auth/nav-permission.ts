import { authClient } from "@/lib/auth/auth-client";
import { statement } from "@/lib/auth/permissions";
import { NavItem } from "@/types/nav";
import { getMainNavItems } from "@/utils/navigation";

type Role = "member" | "admin" | "owner";
export function checkPermission(
  role: string,
  resource: keyof typeof statement,
  action: string
): boolean {
  switch (role as Role) {
    case "member":
      return authClient.organization.checkRolePermission({
        permission: {
          [resource]: [action],
        },
        role: "member",
      });
    case "admin":
      return authClient.organization.checkRolePermission({
        permission: {
          [resource]: [action],
        },
        role: "admin",
      });
    case "owner":
      return authClient.organization.checkRolePermission({
        permission: {
          [resource]: [action],
        },
        role: "owner",
      });
    default:
      return false;
  }
}

/**
 * Type-safe function to check if a user with a given role has permission for a navigation item
 * @param role The user's role ("member", "admin", or "owner")
 * @param permission The permission string in format "resource:action"
 * @returns boolean indicating whether the user has permission
 */
export function hasNavPermission(role: string, permission?: string): boolean {
  if (!permission) return true; // If no permission is required, allow access

  const [resource, action] = permission.split(":");

  // Ensure the resource is a valid key in the statement object
  if (!(resource in statement)) return false;

  // Type assertion to tell TypeScript that resource is a valid key
  const typedResource = resource as keyof typeof statement;

  return checkPermission(role, typedResource, action);
}

/**
 * Filter navigation items based on user role permissions
 * @param items Array of navigation items
 * @param role User role
 * @returns Filtered array of navigation items
 */
export function filterNavItemsByPermission(
  items: NavItem[],
  role: string
): NavItem[] {
  return items
    .filter((item) => hasNavPermission(role, item.permission))
    .map((item) => ({
      ...item,
      // Recursively filter nested items if they exist
      items: item.items
        ? filterNavItemsByPermission(item.items, role)
        : undefined,
    }));
}

/**
 * Get navigation items filtered by user role permissions
 * @param orgId Organization ID
 * @param role User role
 * @returns Filtered array of navigation items
 */
export function getAuthorizedNavItems(orgId: string, role: string): NavItem[] {
  const allNavItems = getMainNavItems(orgId);
  return filterNavItemsByPermission(allNavItems, role);
}
