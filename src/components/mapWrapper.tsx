"use client";

import { Container, Firm } from "@prisma/client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      Loading map...
    </div>
  ),
});

// interface MapWrapperProps {
//   firms: (Firm&Container)[];
// }

export default function MapWrapper({
  firms,
}: {
  firms: (Firm & { containers: Container[] })[];
}) {
  // Validate firms data exists and has items
  if (!firms || firms.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        No firm data available
      </div>
    );
  }

  // Ensure each firm has a unique identifier
  //   const validatedFirms = firms.map(firm => ({
  //     ...firm,
  //     // Use existing unique field or create a composite key
  //     key: firm.firma_kisa_adi || `${firm.latitude}-${firm.longitude}`
  //   }));

  return <MapComponent firms={firms} />;
}
