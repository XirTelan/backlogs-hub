"use client";
import React from "react";
import ProgressTimer from "../../../features/progressTimer/ProgressTimer";
import { RxLapTimer } from "react-icons/rx";
import MarkdownEditor from "@/shared/ui/MarkdownEditor/MarkdownEditor";
import { FaExternalLinkAlt } from "react-icons/fa";
import { InputField, Divider, Select, LinkBase } from "@/shared/ui";
import { DemoBlockContainer } from "./BlockWrapper";

export const InputsDemoPage = () => {
  return (
    <>
      <DemoBlockContainer title={"Text"} description={"Simplet text imput"}>
        <InputField label="Demo input" variant="small" />
      </DemoBlockContainer>
      <Divider />
      <DemoBlockContainer
        title={"Number"}
        description={"Simplet imput which allows only numbers"}
      >
        <InputField type="number" label="Demo input" variant="small" />
      </DemoBlockContainer>
      <Divider />
      <DemoBlockContainer title={"Date"} description={"Simplet imput for Date"}>
        <InputField type="Date" label="Demo input" variant="small" />
      </DemoBlockContainer>
      <Divider />
      <DemoBlockContainer
        title={"Timer"}
        description={
          <div>
            <p>Time tracking block. Specified in the format HH:MM:SS.</p>
            <p>
              <RxLapTimer className=" inline" />- Timer mode. Allows you to turn
              on the timer. After which the result can be added to the total
              time
            </p>
          </div>
        }
      >
        <ProgressTimer
          label={"Demo"}
          name={"timer"}
          defaultValue={""}
          setValue={() => {
            return;
          }}
        />
      </DemoBlockContainer>
      <Divider />
      <DemoBlockContainer
        title={"Select"}
        description={"This type is used to create a drop-down list"}
      >
        <Select
          label="Select demo"
          options={["Example 1", "Example 2", "Example 3"]}
        ></Select>
      </DemoBlockContainer>
      <Divider />
      <DemoBlockContainer
        title={"Markdown"}
        description={
          <div className="flex gap-1">
            <p>Text area editor with markdown syntax</p>
            <LinkBase
              target="_blank"
              rel="noopener nofollow  noreferrer"
              href={
                "https://www.markdownguide.org/getting-started/#what-is-markdown"
              }
            >
              What is Markdown?
              <span className="ms-2">
                <FaExternalLinkAlt title="Open in new window" />
              </span>
            </LinkBase>{" "}
          </div>
        }
      >
        <MarkdownEditor
          name="Markdown"
          defaultValue=""
          setValue={() => {
            return;
          }}
        />
      </DemoBlockContainer>
    </>
  );
};
