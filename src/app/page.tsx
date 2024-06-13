import SignInForm from "@/containers/Auth/SignInForm";

export default async function Home() {
  return (
    <div className="bg-red flex w-full  ">
      <div className="flex ps-8 ">
        <SignInForm />
      </div>
      <div className=" flex grow">2</div>
    </div>
  );
}
