"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SerchPage = dynamic(() => import("./SerchPage"));

export default function ClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SerchPage />
    </Suspense>
  );
}
