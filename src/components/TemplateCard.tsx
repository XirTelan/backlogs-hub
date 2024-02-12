import React from "react";
import { motion } from "framer-motion";

const TemplateCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className=" relative flex h-fit min-w-80  flex-col break-words  rounded-t-xl bg-[#222222] shadow "
    >
      <div className="relative  ">
        <div
          className=" absolute bottom-0 left-0 right-0 top-0 z-0 w-full  rounded-t-xl bg-gradient-to-b from-neutral-900 "
          style={{
            backgroundImage: "url(/HDwallpape.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className=" absolute bottom-0 left-0 right-0 top-0 z-0 w-full rounded-t-xl bg-gradient-to-b from-neutral-900  "></div>
        <div className=" absolute bottom-0 left-0 right-0 top-0 z-0 w-full  rounded-t-xl bg-gradient-to-t from-neutral-900  "></div>
        <div className=" relative z-10 p-4">
          <h2 className=" mb-2 text-center text-2xl">{"Games"}</h2>
          <div className=" text-base">
            <p>
              <strong className=" text-[#f0ad4e]">Backlog Title:</strong>{" "}
              {"backlogTitle"}
            </p>
            <p>
              <strong>Description:</strong> {"description"}
            </p>
            <p>
              <strong>Features:</strong> {"features"}
            </p>
            <p>
              <strong>Fields:</strong> {"fields"}
            </p>
            <div>
              <strong>Categories:</strong>
              <div>Completed</div>
              <div>Playing</div>
              <div>Backlog</div>
              <div>Retire</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative  mb-8 mt-4  p-4 ">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor
          dignissim odio eu porta. Mauris odio odio, facilisis at ipsum sit
          amet, facilisis maximus magna. In at mauris eget turpis consectetur
          bibendum in eget magna. Morbi tincidunt fringilla felis, et mattis mi
          sodales ut. Sed porttitor, neque a pulvinar bibendum, erat urna
          sodales sapien, ut tempor quam felis pharetra sem. Vivamus nulla enim,
          ullamcorper nec augue condimentum, dignissim aliquam turpis. Etiam a
          massa sit amet diam maximus eleifend ut quis ante. Aliquam erat
          volutpat.
        </p>
      </div>
      <button className="absolute bottom-0 left-0 w-full rounded-b bg-green-800 p-2">
        Use Template
      </button>
    </motion.div>
  );
};

export default TemplateCard;
