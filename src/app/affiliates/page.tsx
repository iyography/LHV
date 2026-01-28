"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AffiliatesPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A853]" />
    </div>
  );
}
