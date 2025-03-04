import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";

export default async function MembersPage(props: {
  params: Promise<{ orgId: string }>;
}) {
  const params = await props.params;
  console.log(params);
  const member = await auth.api.getActiveMember({ headers: await headers() });

  return (
    <>
      <PageHeader label="Dashboard"></PageHeader>

      <div className="w-full px-6">
        <Card>
          <CardHeader>
            <CardTitle>Permissions Overview</CardTitle>
            <CardDescription>
              Detailed view of permissions for each role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(member, null, 2)}
            </pre>
            <div className="overflow-x-auto"></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
