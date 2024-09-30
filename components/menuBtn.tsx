"use client";
import React, { useState } from "react";
import SideMenu from "./sideMenu";
import { IoMenu } from "react-icons/io5";

const MenuBtn: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <div>
      <div className="w-44 flex justify-center mb-5">
        <IoMenu onClick={handleMenuClick} size={"40px"} />
      </div>
      {isMenuOpened && (
        <SideMenu
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
        />
      )}
    </div>
  );
};

export default MenuBtn;
