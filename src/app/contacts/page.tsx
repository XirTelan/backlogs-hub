import { getCurrentUserInfo } from "@/auth/utils";
import TopTitle from "@/components/Common/UI/TopTitle";
import ContactsForm from "@/components/ContactsForm";

const page = async () => {
  const user = await getCurrentUserInfo();
  const confirmCode = String(Math.floor(Math.random() * 10000));
  return (
    <>
      <TopTitle title="Contacts" />
      <main className="container self-center px-4 ">
        <div>
          <p>I&apos;d Love to Hear From You</p>
          <p>
            Whether you have a problemm, a question, or just want to share
            something, I&apos;m all ears.
          </p>
        </div>
        <div className=" max-w-xl bg-layer-1 p-4 ">
          <ContactsForm user={user} code={confirmCode} />
        </div>


      </main>
    </>
  );
};

export default page;
