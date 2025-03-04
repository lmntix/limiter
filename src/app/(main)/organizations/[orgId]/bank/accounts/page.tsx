import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Accounts() {
  return (
    <>
      <PageHeader label="Accounts">
        <Button variant="outline">Add Accounts</Button>
      </PageHeader>
    </>
  );
}
