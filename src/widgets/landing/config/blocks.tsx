import { LinkBase, Title } from "@/shared/ui";
import { LandingBlockItem } from "./types";

export const BLOCKS: LandingBlockItem[] = [
  {
    dir: "left",
    contentBlock: (
      <Title
        variant={2}
        title={`Create Custom Backlogs: Design your backlogs with any categories and
        fields that suit your needs`}
        className="  break-words"
      />
    ),
    textBlock: (
      <div className="p-4">
        <p className=" font-semibold  ">Manage and Organize:</p>
        <p className="mb-4 mt-2 px-2  text-base  text-text-on-color ">
          You can create up to 10 categories and as many fields as you need.
          There are different types available for fields{" "}
          <LinkBase href={"/faq#backlogFields"}>
            About available types{" "}
          </LinkBase>
        </p>
        {/* <Image src={backlogImg_1} alt={""} /> */}
      </div>
    ),
  },
  {
    dir: "right",
    contentBlock: (
      <div className="p-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="p-4">{/* <Image src={manage_1} alt={""} /> */}</div>
          <div className="p-4">{/* <Image src={manage_2} alt={""} /> */}</div>
        </div>
      </div>
    ),
    textBlock: (
      <div>
        <p className=" font-semibold  ">Manage and Organize:</p>
        <p className="text-base">
          Create folders and arrange your backlogs in the order that makes the
          most sense for you
        </p>
        <p className=" text-base ">
          You can change both the order of the backlogs and the folders
          themselves.
        </p>
      </div>
    ),
  },
  {
    dir: "left",
    contentBlock: <div>{/* <Image src={template_1} alt={""} /> */}</div>,
    textBlock:
      "Templates: From each backlog you can make a template that can be reused in the future or shared",
  },
];
