import Title from "./Title";
import DemoBlock from "./UI/DemoBlock";

const BlockWrapper = ({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div id={title} className="w-fit text-white">
    <Title variant={3} title={title} />
    <div className=" text-secondary-text">{description}</div>
    <DemoBlock>{children}</DemoBlock>
  </div>
);

export default BlockWrapper;
