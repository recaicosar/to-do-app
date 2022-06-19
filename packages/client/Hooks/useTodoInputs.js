import { useState } from "react";
import { todoFormSetter } from "@/utils/helper";

export const useTodoInputs = (params, priorities) => {
  const [inputs, setInputs] = useState(params);

  const handleChange = (event) => {
    if (event?.target === undefined) {
      setInputs({...inputs,...event});
      return;
    }
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: todoFormSetter(params, priorities, name, value),
    });
  };

  return [inputs, handleChange];
};
