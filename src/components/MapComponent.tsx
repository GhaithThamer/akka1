"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Container, Firm } from "@prisma/client";

interface MapProps {
  firms: (Firm & { containers: Container[] })[];
  center?: [number, number];
  zoom?: number;
}

export default function MapComponent({ firms, center, zoom = 12 }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mapCenter: [number, number] =
    center ||
    (firms.length > 0
      ? [firms[0].latitude+0.015, firms[0].longitude-0.1]
      : [51.505, -0.09]);

  const shadowIcon = useMemo(() => {
    return L.icon({
      iconUrl: "/images/marker-shadow.png",
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      className: "marker-shadow",
    });
  }, []);

  if (!mounted) {
    return <div className="h-[400px] w-[80%] mx-auto">Loading map...</div>;
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "400px", width: "80%", margin: "0 auto" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {firms.map((firm) => {
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              position: relative;
              width: 50px;
              height: 41px;
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('/images/firms/${firm.firmShortName}.png'), url('/images/marker.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
              "></div>
              <div style="
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 12px;
                border: 1px solid #BABABA;
                z-index: 1000;
              ">
                ${firm.containers.length}
              </div>
            </div>
          `,
          iconSize: [50, 41],
          iconAnchor: [25, 41],
          popupAnchor: [1, -34],
        });

        return (
          <div key={`marker-group-${firm.firmShortName}`}>
            {/* Shadow Marker */}
            <Marker
              key={`shadow-${firm.firmShortName}`}
              position={[firm.latitude, firm.longitude]}
              icon={shadowIcon}
              interactive={false}
              zIndexOffset={-1000}
            />

            {/* Main Marker with number */}
            <Marker
              key={`main-${firm.firmShortName}`}
              position={[firm.latitude, firm.longitude]}
              icon={customIcon}
              zIndexOffset={1000}
            >
              <Popup>
                <strong style={{ fontSize: "1.2rem" }}>
                  {firm.firmName || "FirmWithContainer"}
                </strong>
                <br />
                <table className="table-auto w-full mt-2">
                  <thead>
                    <tr>
                      <th className="w-60">Sicil No</th>
                      <th>Konteyner No</th>
                      <th className="w-60">Ebat</th>
                      <th>Açıklama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {firm.containers.map((container, i) => (
                      <tr
                        key={`container-${container.id}`}
                        className={i % 2 === 0 ? "bg-blue-100" : "bg-white"}
                      >
                        <td>{container.recordNo}</td>
                        <td>{container.number}</td>
                        <td>{container.type}</td>
                        <td>{container.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
