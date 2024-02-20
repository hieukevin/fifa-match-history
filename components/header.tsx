import Link from "next/link";
import React from "react";
import PageHeader from "./pageHeader";

function Header() {
  return (
    <div>
      <div className="relative w-full flex flex-col text-white text-center">
        <PageHeader title="Hieu vs Kuba" />
        <p className="sm:text-2xl text-sm">FIFA 23 stats</p>
      </div>
    </div>
  );
}

export default Header;
