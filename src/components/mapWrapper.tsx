"use client";

import { Container, Firm } from "@prisma/client";
import dynamic from "next/dynamic";
import DropDownList from "./dropDownList";
import { useEffect, useState } from "react";
// import MapComponent from "@/components/MapComponent";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
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

  const dropdownOptions = firms.map((firm) => ({
    value: firm.firmShortName,
    label: firm.firmName,
  }));

  const renderedContainers = containers.map((container) => (
    <div
      key={container.id}
      className="flex flex-row gap-2 border p-2 m-2 align-bottom"
    >
      <div>
        {container.recordNo}
        <button className="bg-blue-300 text-white px-2 rounded text-sm hover:bg-blue-400">
          Keydet
        </button>
      </div>
      <DropDownList
        options={dropdownOptions}
        onSelect={(value) => console.log(value)}
        defaultLabel={
          firms.find((firm) => firm.firmShortName === container.firmId)
            ?.firmName
        }
      />
    </div>
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