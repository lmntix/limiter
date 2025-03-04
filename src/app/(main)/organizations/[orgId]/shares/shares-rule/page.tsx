import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function SharesRule() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  console.log("share: ", timestamp);
  return (
    <>
      <PageHeader label="SharesRule">
        <Button variant="outline">Add Shares Rule</Button>
      </PageHeader>
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Dynamic Page</h1>
          <p className="mb-4">
            This page is dynamically rendered on every request.
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Timestamp: <span className="font-mono">{timestamp}</span>
          </p>
          <p className="text-sm text-gray-600">
            Random number: <span className="font-mono">{randomNumber}</span>
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Current timestamp: <span className="font-mono">{timestamp}</span>
      </p>
    </>
  );
}
