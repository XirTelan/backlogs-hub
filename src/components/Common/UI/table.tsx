import React from "react";
import SearchBar from "@/components/SearchBar";

type ToolBarProps = {
  search?: boolean;
  showButton?: boolean;
  customButton?: React.ReactElement;
};

type TableTitleProps = {
  title: string;
  description: string;
};

const TableTitle = ({ title, description }: TableTitleProps) => {
  return (
    <div className="px-4 pb-6  pt-4">
      <div className=" text-xl">{title}</div>
      <div className=" text-base text-text-secondary">{description}</div>
    </div>
  );
};

const ToolBar = ({
  showButton = true,
  customButton,
  search = false,
}: ToolBarProps) => {
  return (
    <section aria-label="data table  toolbar">
      <div className=" flex max-w-full  justify-between">
        {search && <SearchBar />}
        {customButton && showButton && <div>{customButton}</div>}
      </div>
    </section>
  );
};

const TableHeader = ({ children, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead {...props}>
      <tr className=" h-12 bg-layer-accent-1">{children}</tr>
    </thead>
  );
};

const TableHead = ({ ...props }: React.ComponentProps<"th">) => {
  return <th className="p-4 text-start text-text-primary" {...props} />;
};

const TableBody = (props: React.ComponentProps<"tbody">) => {
  return <tbody {...props} />;
};

const Table = ({ className, ...props }: React.ComponentProps<"table">) => {
  return <table className="w-full table-fixed " {...props} />;
};

export { Table, TableHeader, TableHead, TableTitle, ToolBar, TableBody };
