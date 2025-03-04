import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Recurring() {
  return (
    <>
      <PageHeader label="Recurring">
        <Button variant="outline">Add Recurring</Button>
      </PageHeader>
    </>
  );
}
