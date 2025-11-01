"use client";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/inputPassword";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SpinnerButton() {

  return (
    <div className="flex w-70 mx-auto mt-70 items-center gap-4">
      <InputPassword/>
    </div>
  );
}
