import React, { useState } from "react";
import InputField from "./InputField";

const InputFieldControlled = ({ defaultValue }: { defaultValue: string }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <InputField value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export default InputFieldControlled;
