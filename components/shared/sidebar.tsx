"use client";

import React from "react";

import { Category } from "./category";
// import { Filters } from "./filters";

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden bg-white p-4 min-w-72 mobile:p-6 tablet:p-8 rounded-3xl h-max tablet:block tablet:sticky top-4">
      <Category />
      {/* <Filters /> */}
    </div>
  );
};
