"use client";
import React from "react";
import BlockWrapper from "./BlockWrapper";
import InputField from "./UI/InputField";
import ProgressTimer from "./UI/ProgressTimer";
import Divider from "./UI/Divider";
import { RxLapTimer } from "react-icons/rx";
import Select from "./UI/Select";

const InputsDemoPage = () => {
  return (
    <>
      <BlockWrapper title={"Text"} description={"Simplet text imput"}>
        <InputField label="Demo input" variant="small" />
      </BlockWrapper>
      <Divider />
      <BlockWrapper
        title={"Number"}
        description={"Simplet imput which allows only numbers"}
      >
        <InputField type="number" label="Demo input" variant="small" />
      </BlockWrapper>
      <Divider />
      <BlockWrapper title={"Date"} description={"Simplet imput for Date"}>
        <InputField type="Date" label="Demo input" variant="small" />
      </BlockWrapper>
      <Divider />
      <BlockWrapper
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
      </BlockWrapper>
      <Divider />
      <BlockWrapper
        title={"Select"}
        description={"This type is used to create a drop-down list"}
      >
        <Select
          label="Select demo"
          options={["Example 1", "Example 2", "Example 3"]}
        ></Select>
      </BlockWrapper>
    </>
  );
};

export default InputsDemoPage;
