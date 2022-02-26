import React, { useState } from "react";

function useInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return { value, onChange, setValue };
}

export default useInput;
