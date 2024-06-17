import SignInForm from "@/containers/Auth/SignInForm";

export default async function Home() {
  return (
    <div className="flex w-full ">
      <div className=" mx-10 md:mt-10 flex ">
        <SignInForm />
      </div>

    </div>
  );
}
