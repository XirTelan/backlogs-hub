"use client";
import React, { useMemo } from "react";
import { IoMdTimer } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import ButtonBase from "../Common/UI/ButtonBase";
import Title from "../Common/Title";
import Tag from "../Common/UI/Tag";
import Accordion from "../Common/UI/Accordion";
import { TemplateDTO } from "@/zodTypes";
import { MdDelete } from "react-icons/md";

const icons = {
  timer: <IoMdTimer />,
  text: <IoText />,
  number: <AiOutlineFieldNumber />,
  date: <FaCalendarCheck />,
  lock: <FaLock size={16} />,
};

const TemplateCard = ({
  template,
  canDelete,
  onDelete,
  onClick,
}: TemplateCardProps) => {
  const fields = useMemo(() => {
    if (template.fields && template.fields.length === 0)
      return <span className=" text-secondary-text">No additional fields</span>;
    return (
      <ul className="flex flex-wrap gap-2">
        {template.fields!.map((field) => (
          <li key={field.name}>
            <Tag title={field.name} icon={icons[field.type]} />
          </li>
        ))}
      </ul>
    );
  }, [template.fields]);

  return (
    <div className="flex h-fit w-full flex-col bg-layer-1">
      <div className="relative flex  grow flex-col  ">
        <div className=" relative z-10  ">
          <Title
            description={`Author: ${template.author}`}
            title={template.templateTitle}
            style={{
              marginLeft: "1rem",
            }}
            variant={2}
          />
          <div className=" grid gap-2 px-4  text-base">
            <div>
              <span>Features:</span> <div>{template.features}</div>
            </div>
            <div className="flex justify-between">
              {template.fields && template.fields.length > 2 ? (
                <Accordion title={`Fields (${template.fields.length})`}>
                  {fields}
                </Accordion>
              ) : (
                <>
                  Fields
                  {fields}
                </>
              )}
            </div>
            <div className="flex flex-wrap justify-between">
              Categories:
              <ul
                className="flex gap-2"
                style={{ columnCount: template.categories.length <= 4 ? 1 : 2 }}
              >
                {template.categories.map((category) => (
                  <li key={category.name}>
                    <Tag
                      color={category.color}
                      title={category.name}
                      icon={category.protected ? icons.lock : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative px-4 pt-2  ">
        <Accordion title={"Description"}>
          {template.description
            ? template.description
            : "Description not provided"}
        </Accordion>
      </div>
      <div className="flex p-2">
        {canDelete && (
          <ButtonBase
            variant="dangerPrimary"
            onClick={() => onDelete(template._id)}
            icon={<MdDelete />}
            style={{ width: "auto" }}
          />
        )}
        <ButtonBase
          variant="secondary"
          text="Use template"
          onClick={onClick}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default TemplateCard;

type TemplateCardProps = {
  template: TemplateDTO;
  canDelete?: boolean;
  onDelete: (id: string) => void;
  onClick: () => void;
};
