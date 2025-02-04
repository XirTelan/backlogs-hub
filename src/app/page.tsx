// import bg from "../../public/untitled.png";

import LinkBase from "@/components/Common/UI/LinkBase";
import Notification from "@/components/Common/UI/Notification";
import SignInForm from "@/containers/Auth/SignInForm";

export default async function Home() {
  return (
    <>
      <main id="maincontent" className="flex flex-col items-center">
        <section
          className="container  relative  min-h-screen-1 "
          style={{
            // backgroundImage: `url(${bg.src})`,
            backgroundPositionX: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className=" absolute bottom-0 h-40 w-full bg-gradient-to-t from-black/60 "></div> */}
          <div className="container md:flex">
            <div className=" flex bg-bg-main px-10 md:pt-10 ">
              <SignInForm />
            </div>
            <div className="mt-4 flex grow justify-center p-4">
              <div className="flex flex-col gap-2">
                <p className=" text-4xl font-bold">
                  Welcome to{" "}
                  <span className=" text-link-primary  "> BacklogsHub </span> -{" "}
                  <span className="font-normal">
                    {" "}
                    All backlogs in one place
                  </span>
                </p>
                <p>
                  Hello there! BacklogsHub it`&apos;s a personal project where
                  you have a free and versatile space to create and
                  orginize/manage your own backlogs just the way you want.
                </p>
                <p>
                  Scroll down if you want find out more about this project. And
                  if you have any questions about how to use BacklogsHub, visit{" "}
                  <LinkBase href={"/faq"}> FAQ section.</LinkBase>
                </p>
                <Notification
                  options={{ showBtn: false }}
                  text={
                    <div className="p-2">
                      <p>
                        Just a heads-up. The app is still under active
                        development. Not all features have been implemented and
                        there are some bugs in places.{" "}
                      </p>
                      <LinkBase href={"/contacts"}>
                        Appreciate any feedback
                      </LinkBase>

                      <LinkBase href={"/updates"}>
                        Check out the latest updates
                      </LinkBase>
                    </div>
                  }
                  type={"info"}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
