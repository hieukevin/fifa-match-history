import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div>
      <div className="relative w-full flex flex-col text-white text-center">
        <h1 className="lg:text-4xl sm:text-4xl text-xl sm:mb-4 mb-2">Hieu vs Kuba</h1>
        <p className="sm:text-2xl text-sm">FIFA 23 stats</p>
      </div>
    </div>
  );
}

export default Header;
