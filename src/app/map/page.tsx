"use client";

// import { dummyData } from "@/database/dummyData";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// Dynamically import the MapComponent with no SSR
// const MapComponent = dynamic(() => import("@/components/MapComponent"), {
//   ssr: false,
//   loading: () => <p>Loading map...</p>,
// });


// export interface Location {
//   id: string;
//   konteyner_sicil_no: string;
//   konteyner_no: string;
//   konteyner_ebati: string;
//   aciklama_kismi: string;
//   firma_kisa_ismi: string;
//   firma: string;
//   adres: string;
//   latitude: number;
//   longitude: number;
// }

export default function Home() {
  // const [locations, setLocations] = useState<Location[]>(dummyData);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Multiple Locations Map</h1>

      <div className="h-[500px] w-full">
        {/* <MapComponent locations={locations} /> */}
      </div>
    </main>
  );
}
