import Image from "next/image";
import React from "react";

const NoUserImage = () => {
  return (
    <div className="relative size-24">
      <Image src={"/svg/no-user.svg"} fill alt="user" />
    </div>
  );
};

export default NoUserImage;
