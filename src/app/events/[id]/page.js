import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";
import DetailsClient from "./DetailsClient";

export const metadata = { title: "Match Details" };

export default async function MatchDetailsPage({ params }) {
  const { id } = (await params) || {};
  return (
    <Suspense fallback={<LoadingSpinner size="md" />}>
      <DetailsClient id={id} />
    </Suspense>
  );
}


