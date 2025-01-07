import NoUserImage from "@/components/common/no-user";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const My = () => {
  return (
    <div>
      <section className="flex gap-6 p-4">
        <NoUserImage />
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-xl font-bold">이름</h2>
          <span className="text-sm text-gray-500">test@email.com</span>
          <Link href={"/my/profile"}>
            <Button variant={"outline"} size={"sm"}>
              프로필 관리
            </Button>
          </Link>
        </div>
      </section>
      <div className="h-2 bg-gray-100" />
      <section></section>
    </div>
  );
};

export default My;
