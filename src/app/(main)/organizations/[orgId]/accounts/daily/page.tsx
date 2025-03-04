import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default async function Daily() {
  return (
    <>
      <PageHeader label="Daily">
        <Button variant="outline">Add Daily</Button>
      </PageHeader>
    </>
  );
}
