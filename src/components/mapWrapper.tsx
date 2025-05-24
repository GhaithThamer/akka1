"use client";

import { Container, Firm } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ContainerSaveForm from "./containerSaveForm";
import NewContainerForm from "./movablePlates/newContainerForm";
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
  const [showNewContainerForm, setShowNewContainerForm] = useState(false);

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
    <div className="h-full w-full flex flex-col">
      {showNewContainerForm && (
        <NewContainerForm
          x={15}
          y={106}
          z={2000}
          onHide={() => {
            setShowNewContainerForm(false);
          }}
        >
          <div>hi</div>
        </NewContainerForm>
      )}
      <div className="flex flex-row gap-4  h-full">
        <div
          className="absolute top-150 left-0 z-10 h-5/6"
        >
          <div className="flex flex-col gap-2 overflow-y-auto border border-gray-300 rounded-lg p-4 h-full w-[300px] bg-white ">
            <button
              className={
                "bg-blue-300 text-white px-4 py-2 rounded-xl hover:bg-blue-400 mb-2 text-sm" +
                (showNewContainerForm ? " bg-blue-400" : "")
              }
              onClick={() => {
                // setShowNewContainerForm((prev) => !prev);
                setShowNewContainerForm(true);
              }}
            >
              YENİ KONTEYNER EKLE
            </button>
            <div>{renderedContainers}</div>
          </div>
        </div>
        <div className="w-[300px]"></div>
        <MapComponent firms={firms} />
      </div>
    </div>
  );
}
