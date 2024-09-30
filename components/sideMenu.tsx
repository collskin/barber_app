"use client";
import React, { Dispatch } from "react";
import { IoMenu } from "react-icons/io5";

interface SideMenuProps {
  isMenuOpened: boolean;
  setIsMenuOpened: Dispatch<boolean>;
}

const SideMenu: React.FC<SideMenuProps> = ({
  isMenuOpened,
  setIsMenuOpened,
}) => {
  const handleMenuClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  return (
    <div className="w-44 min-h-screen bg-green-200 absolute top-0 right-0">
      <div className=" flex flex-col justify-center">
        <div className=" flex justify-center mt-5">
          <IoMenu onClick={handleMenuClick} size={"40px"} />
        </div>
        <button className="text-black">text1</button>
        <button className="text-black">text2</button>
        <button className="text-black">text3</button>
        <button className="text-black">text4</button>
      </div>
    </div>
  );
};

export default SideMenu;
