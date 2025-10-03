"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { FixturesProvider } from "@/contexts/FixturesContext";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <FixturesProvider>{children}</FixturesProvider>
    </QueryClientProvider>
  );
}


