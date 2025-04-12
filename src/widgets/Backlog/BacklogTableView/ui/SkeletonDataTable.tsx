const Content = () => (
  <div className="m-auto h-2 w-10 animate-pulse bg-layer-3 "></div>
);
const TableTh = () => (
  <th className=" h-16  ">
    <Content />
  </th>
);
const TableTr = () => (
  <tr className=" h-16  ">
    <td className="m-auto h-16  ">
      <Content />
    </td>
    <td className="m-auto h-16  ">
      <Content />
    </td>
    <td className="m-auto h-16  ">
      <Content />
    </td>
    <td className="m-auto h-16  ">
      <Content />
    </td>
  </tr>
);

const SkeletonDataTable = () => {
  return (
    <>
      <div className=" flex min-h-80 w-full flex-col bg-layer-1">
        <div className="mb-10 px-4  pb-6 pt-4">
          <div className=" mb-4 text-xl">
            <div className="h-10 w-40 animate-pulse bg-layer-2"></div>
          </div>
          <div className=" text-base text-text-secondary">
            <div className="h-5 w-80 animate-pulse bg-layer-2"></div>
          </div>
        </div>
        <section
          className="relative flex flex-col"
          aria-label="data table  toolbar"
        >
          <div className="absolute hidden">1</div>
          <div className="flex w-full">
            <div className="ms-auto">
              <div className=" h-12 w-32 animate-pulse  bg-layer-2/50 "></div>
            </div>
          </div>
        </section>
        <table>
          <thead>
            <tr className=" h-16  items-center bg-layer-accent-1">
              <TableTh />
              <TableTh />
              <TableTh />
              <TableTh />
            </tr>
          </thead>
          <tbody>
            <TableTr />
            <TableTr />
            <TableTr />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SkeletonDataTable;
