"use client";
import React from "react";
import { TemplateDTO } from "@/types";
import { IoMdTimer } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import ButtonBase from "../Common/UI/ButtonBase";
import Title from "../Common/Title";

const TemplateCard = ({ template, toSubmit }: TemplateCardProps) => {
  const icons = {
    timer: <IoMdTimer />,
    text: <IoText />,
    number: <AiOutlineFieldNumber />,
    date: <FaCalendarCheck />,
    lock: <FaLock />,
  };

  return (
    <div className="min-w-80 max-w-80">
      <div className="relative flex  grow flex-col  ">
        <div
          className=" absolute bottom-0 left-0 right-0 top-0 z-0 w-full   bg-gradient-to-b from-neutral-900 "
          style={{
            backgroundImage: "url(/HDwallpape.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className=" absolute bottom-0 left-0 right-0 top-0 z-0 w-full   bg-neutral-900 opacity-90  "></div>
        <div className=" relative z-10  ">
          <Title title={template.templateTitle} variant={2} />
          <p className="ps-4 text-secondary-text">{template.author}</p>
          <div className=" p-4  text-base">
            <div>
              <strong>Features:</strong> <div>{template.features}</div>
            </div>
            <div>
              <strong>Fields:</strong>
              <ul className="flex flex-wrap gap-2">
                {template.fields.map((field) => (
                  <li
                    className="relative flex items-center rounded-xl border border-neutral-700 bg-neutral-800 p-1 text-center"
                    key={field.name}
                  >
                    <div className="ms-8">{field.name}</div>
                    <div className="absolute bottom-0 left-0 top-0 ms-auto flex items-center rounded-s-xl border-e border-e-neutral-700  bg-green-800 p-2">
                      {icons[field.type]}
                    </div>
                    {field.protected && (
                      <div className="absolute bottom-0 right-0 top-0 ms-auto flex items-center rounded-e-xl border-s border-s-neutral-700  bg-green-800 p-2">
                        {icons.lock}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <strong>Categories:</strong>
              <ul
                className="flex flex-col gap-1"
                style={{ columnCount: template.categories.length <= 4 ? 1 : 2 }}
              >
                {template.categories.map((category) => (
                  <li
                    key={category.name}
                    className={`relative rounded-lg  border border-neutral-700 bg-neutral-800 p-1 text-center`}
                    style={{ color: category.color || "#fff" }}
                  >
                    <span className={`${category.protected && "me-6"}`}>
                      {category.name}
                    </span>
                    {category.protected && (
                      <div className="border-s-lg absolute bottom-0 right-0 top-0 ms-auto flex items-center rounded-e border-s-neutral-700 bg-green-800  p-1 text-white">
                        {icons.lock}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative px-4 pt-2  ">
        <div className=" absolute -top-4 left-0 right-0 flex items-center justify-center">
          <div className="h-0.5 w-1/6  bg-primary-btn" />
          <div className=" rounded-lg border-2 border-primary-btn bg-neutral-600 p-1">
            Description
          </div>
          <div className="h-0.5 w-full bg-primary-btn" />
        </div>
        <p className="mt-4 break-words">{template.description}</p>
      </div>
      <div className="p-4">
        <ButtonBase
          variant="secondary"
          text="Use template"
          onClick={toSubmit}
        />
      </div>
    </div>
  );
};

export default TemplateCard;

type TemplateCardProps = {
  template: TemplateDTO;
  toSubmit: () => void;
};
