import style from "./Loading.module.css";
const lines = [0, 1, 2, 3, 4, 3, 2, 1, 0];

const LoadingAnimation = ({
  height = 160,
  wide = false,
}: {
  height?: number;
  wide?: boolean;
}) => {
  return (
    <div
      className={`flex min-h-40 w-full items-center justify-center ${wide ? "h-80 w-80" : ""}`}
    >
      <div
        style={{ height: height, maxHeight: height }}
        className={`${style.container}`}
      >
        {lines.map((item) => {
          return <div key={item} className={style.bar} />;
        })}
      </div>
    </div>
  );
};

export default LoadingAnimation;
