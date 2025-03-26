"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    console.log(params);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className=" items-center hidden lg:flex">
      {!isSearchVisible ? (
        <Image
          src="/icons/search-normal.svg"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer w-6 h-6 "
          onClick={() => setIsSearchVisible(true)}
        />
      ) : (
        <Input
          type="search"
          className="w-full"
          autoFocus
          onBlur={() => setIsSearchVisible(false)}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      )}
    </div>
  );
};
