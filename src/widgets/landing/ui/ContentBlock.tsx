type ContentBlockProps = {
  dir: "left" | "right";
  children: React.ReactNode;
};

export function ContentBlock({ dir, children }: ContentBlockProps) {
  return (
    <div
      className={`${dir === "left" ? " col-start-1 col-end-10" : " col-start-5 col-end-13 "} row-start-1 flex  items-center  justify-center   border-primary-btn-hover `}
    >
      <>{children}</>
    </div>
  );
}
