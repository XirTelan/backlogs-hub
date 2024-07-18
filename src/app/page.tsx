import SignInForm from "@/containers/Auth/SignInForm";
// import bg from "../../public/untitled.png";

export default async function Home() {
  return (
    <>
      <div
        className="h-screen-bh relative flex  w-full"
        style={{
          // backgroundImage: `url(${bg.src})`,
          backgroundPositionX: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className=" absolute bottom-0 h-40 w-full bg-gradient-to-t from-black/80 from-10%"></div>
        <div className=" flex bg-background px-10 md:pt-10 ">
          <SignInForm />
        </div>
        <div></div>
      </div>
      <div className=" h-screen w-full  bg-layer-1 "></div>
    </>
  );
}
