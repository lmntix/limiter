import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function Budget() {
  return (
    <>
      <PageHeader label="Budget">
        <Button variant="outline">Add Budget</Button>
      </PageHeader>
    </>
  );
}
