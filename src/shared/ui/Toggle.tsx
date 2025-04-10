const Toggle = ({
  value,
  action,
}: {
  value: boolean;
  action: (state: boolean) => void;
}) => {
  return (
    <div
      role="switch"
      aria-checked={value}
      className={`${value ? "bg-support-success" : " bg-toggle-off"} flex h-6 w-12 items-center rounded-xl hover:cursor-pointer  `}
      onClick={() => {
        action(!value);
      }}
    >
      <div
        className={`${value ? " translate-x-6 " : " translate-x-1"} h-[18px] w-[18px]  rounded-full bg-icon-on-color transition-transform`}
      ></div>
    </div>
  );
};

export default Toggle;
