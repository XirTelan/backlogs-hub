import Title from "./Title";
import DemoBlock from "./UI/DemoBlock";

const BlockWrapper = ({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div id={id ?? title} className="w-fit text-primary-text">
    <Title variant={3} title={title} />
    <div className=" text-secondary-text">{description}</div>
    <DemoBlock>{children}</DemoBlock>
  </div>
);

export default BlockWrapper;
