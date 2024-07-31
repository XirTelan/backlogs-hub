import style from "./Loading.module.css";

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
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
        <div className={style.bar} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
