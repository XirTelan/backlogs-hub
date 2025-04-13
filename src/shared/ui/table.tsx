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

const TableCell = (props: React.ComponentProps<"td">) => {
  return <td {...props} />;
};

const Table = ({ ...props }: React.ComponentProps<"table">) => {
  return (
    <div className=" flex  w-full flex-col bg-layer-1">
      <table className="w-full table-fixed " {...props} />;
    </div>
  );
};

export { Table, TableHeader, TableHead, TableCell, TableTitle, TableBody };
