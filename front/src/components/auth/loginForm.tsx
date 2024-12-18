import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  return (
    <div className="">
      <h2>Login</h2>
      <form className="flex flex-col gap-4 border-r-red-50">
        <Input placeholder="email" type="email" />
        <Input placeholder="********" />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
