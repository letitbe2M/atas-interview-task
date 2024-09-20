"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const CustomPolygon = dynamic(() => import("@/_components/CustomPolygan"), {
  ssr: false,
});

const DrawPolygan = () => {
  const [selectedArea, setSelectedArea] = useState<any>(undefined);
  const [defaultLatLng, setDefaultLatLng] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  }>({
    lat: 35.715298,
    lng: 51.404343,
    zoom: 8,
  });

  return (
    <div>
      <CustomPolygon
        areaState={selectedArea as { lat: number; lng: number }[]}
        setAreaState={setSelectedArea}
        defaultAreaLatLng={[defaultLatLng.lat, defaultLatLng.lng]}
        zoom={defaultLatLng?.zoom}
      />
    </div>
  );
};

export default DrawPolygan;
