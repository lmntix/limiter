import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Receipt() {
  return (
    <>
      <PageHeader label="Receipt">
        <Button variant="outline">Add Receipt</Button>
      </PageHeader>
    </>
  );
}
