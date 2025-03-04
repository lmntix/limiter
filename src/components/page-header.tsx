import React from "react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  label: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ label, children }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-4 py-4 sm:px-10 sm:py-5">
        <h1 className="text-lg sm:text-xl font-semibold truncate mr-4">
          {label}
        </h1>
        <div className="flex-shrink-0 flex space-x-2">{children}</div>
      </div>
      <Separator className="mb-4" />
    </>
  );
};

export default PageHeader;
