"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

export const NavSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className=" items-center hidden lg:flex">
      {!isSearchVisible ? (
        <Image
          src="/icons/search-normal.svg"
          alt="cart"
          width={20}
          height={20}
          className="cursor-pointer w-5 h-5 "
          onClick={() => setIsSearchVisible(true)}
        />
      ) : (
        <Input
          type="search"
          className="w-full"
          autoFocus
          onBlur={() => setIsSearchVisible(false)}
        />
      )}
    </div>
  );
};
