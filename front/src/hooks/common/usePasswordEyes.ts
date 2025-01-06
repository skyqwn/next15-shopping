import { useState } from "react";

export const usePasswordEyes = () => {
  const [clickedEyes, setClickedEyes] = useState(false);

  const handleClickedEyes = () => {
    setClickedEyes((prev) => !prev);
  };

  return { clickedEyes, handleClickedEyes };
};
