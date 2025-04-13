import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import LinkBase from "@/shared/ui/LinkBase";
import TopTitle from "@/shared/ui/TopTitle";
import ContactsForm from "@/features/contact/ContactsForm";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const page = async () => {
  const user = await getCurrentUserInfo();
  const confirmCode = String(Math.floor(Math.random() * 10000));
  return (
    <>
      <TopTitle title="Contacts" />
      <main id="maincontent" className="container self-center px-4 ">
        <div>
          <p>I&apos;d Love to Hear From You</p>
          <p>
            Whether you have a problem, a question, or just want to share
            something, I&apos;m all ears.
          </p>
        </div>
        <div>
          <label htmlFor="">
            You can create issue on the GitHub project page
          </label>
          <LinkBase
            isExternal
            href={"https://github.com/XirTelan/backlogs-hub/issues"}
            icon={<FaExternalLinkAlt size={12} />}
          >
            <div className="flex items-center gap-1 ">
              <FaGithub />
              <span>GitHub</span>
            </div>
          </LinkBase>
        </div>
        <p> Or you can fill form below</p>
        <div className=" max-w-xl bg-layer-1 p-4 ">
          <ContactsForm user={user} code={confirmCode} />
        </div>
      </main>
    </>
  );
};

export default page;
