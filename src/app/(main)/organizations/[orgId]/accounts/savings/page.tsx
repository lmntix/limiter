import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Savings() {
  return (
    <>
      <PageHeader label="Savings">
        <Button variant="outline">Add Savings</Button>
      </PageHeader>
    </>
  );
}
