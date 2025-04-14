import { Title } from "../../../shared/ui/Title/Title";
import DemoBlock from "./DemoBlock";

export const DemoBlockContainer = ({
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
  <div id={id ?? title} className="w-fit text-text-primary">
    <Title variant={3} title={title} />
    <div className=" text-text-secondary">{description}</div>
    <DemoBlock>{children}</DemoBlock>
  </div>
);
