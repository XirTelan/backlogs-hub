import LoadingMotion from "./LoadingMotion";

const lines = [0, 1, 2, 3, 4, 3, 2, 1, 0];
const Loading = ({ height = 180 }: { height?: number }) => {
  return (
    <div className="flex min-h-40 w-full items-center justify-center">
      <div
        style={{ height: height, maxHeight: height }}
        className=" flex  max-h-44 items-center gap-1"
      >
        {lines.map((item, index) => {
          return <LoadingMotion maxH={height} key={index} indx={item} />;
        })}
      </div>
    </div>
  );
};

export default Loading;
