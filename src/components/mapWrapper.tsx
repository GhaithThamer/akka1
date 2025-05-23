"use client";

import { Container, Firm } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ContainerSaveForm from "./containerSaveForm";
// import MapComponent from "@/components/MapComponent";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center ">
      Loading map...
    </div>
  ),
});

export default function MapWrapper({
  firms,
  containers,
}: {
  firms: (Firm & { containers: Container[] })[];
  containers: Container[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!firms || firms.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        No firm data available
      </div>
    );
  }

  const renderedContainers = containers.map((container) => (
    <ContainerSaveForm key={container.id} container={container} firms={firms} />
  ));

  return (
    <div className="h-[500px] w-full">
      <div className="flex flex-row gap-4">
        <div>{renderedContainers}</div>
        <MapComponent firms={firms} />
      </div>
    </div>
  );
}
