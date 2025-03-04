import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { OrgListForUser } from "@/types/organization";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function OrganizationList({
  organizations,
}: {
  organizations: OrgListForUser[];
}) {
  if (!organizations || organizations.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          You are not a member of any organization.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {organizations.map((org) => (
        <Link
          key={org.id}
          href={`/organizations/${org.id}/dashboard`}
          className="group"
        >
          <Card className="h-full min-w-[250px] transition-all duration-200 hover:bg-accent/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <h2 className="text-base font-medium truncate mb-1">
                    {org.name}
                  </h2>
                  <div className="pt-2">
                    <span>
                      <Badge>{org.role}</Badge>
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function OrganizationListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="h-full min-w-[250px]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <Skeleton className="h-5 w-5 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
