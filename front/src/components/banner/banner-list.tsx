"use client";

import React from "react";
import { useBannersQuery } from "@/hooks/queries/banners/useBannersQuery";
import { bannerColumns } from "./banner-columns";
import { BannerDataTable } from "./banner-data-table";

const BannerList = () => {
  const { data } = useBannersQuery();
  const dataTable = data?.result || [];

  return (
    <div className="p-4">
      <BannerDataTable columns={bannerColumns} data={dataTable} />
    </div>
  );
};

export default BannerList;
