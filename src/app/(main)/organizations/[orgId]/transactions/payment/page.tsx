import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Payment() {
  return (
    <>
      <PageHeader label="Payment">
        <Button variant="outline">Add Payment</Button>
      </PageHeader>
    </>
  );
}
