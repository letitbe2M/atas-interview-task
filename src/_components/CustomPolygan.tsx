"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import CustomButton from "./CustomButton";

type CustomPolygonProps = {
  setAreaState: (latLngs: { lat: number; lng: number }[] | undefined) => void;
  areaState: { lat: number; lng: number }[];
  defaultAreaLatLng: [number, number];
  zoom?: number;
};

const CustomPolygon: React.FC<CustomPolygonProps> = ({
  setAreaState,
  areaState,
  defaultAreaLatLng,
  zoom = 6,
}) => {
  const [editableGroup, setEditableGroup] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(
        [defaultAreaLatLng[0] || 36.92448, defaultAreaLatLng[1] || 50.641372],
        zoom
      );
    }
  }, [defaultAreaLatLng]);

  const exportGeoJson = () => {
    if (editableGroup) {
      const geoJson = editableGroup.toGeoJSON();
      setGeoJsonData(geoJson);
      console.log("Exported GeoJSON: ", geoJson);
    } else {
      setGeoJsonData(null);
    }
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const latLngs = layer.getLatLngs()[0];
    setAreaState(latLngs);
  };

  const handleEdited = (e: any) => {
    e.layers.eachLayer((layer: any) => {
      const latLngs = layer.getLatLngs()[0];
      console.log("Edited Coordinates: ", latLngs);
    });
  };

  const handleDeleted = () => {
    setAreaState(undefined);
  };

  const handleFeatureGroupReady = (groupRef: any) => {
    setEditableGroup(groupRef);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[90vh]">
      <div className="p-4 bg-gray-100 w-full lg:w-1/3 overflow-auto h-[30vh] lg:h-full">
        <div>
          <CustomButton
            onClick={exportGeoJson}
            title="Export GeoJSON"
            color="bg-red-400"
          />
        </div>

        {geoJsonData && (
          <pre className="mt-4 bg-gray-200 p-2 rounded">
            {JSON.stringify(geoJsonData, null, 2)}
          </pre>
        )}
      </div>

      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full relative p-2">
        <MapContainer
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
          center={defaultAreaLatLng}
          zoom={zoom}
          zoomControl={false}
        >
          <TileLayer
            attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          <FeatureGroup ref={handleFeatureGroupReady}>
            <EditControl
              draw={{
                polygon: !areaState?.length,
                polyline: false,
                rectangle: true,
                circle: false,
                circlemarker: false,
                marker: false,
              }}
              position="topright"
              onCreated={handleCreated}
              onEdited={handleEdited}
              onDeleted={handleDeleted}
              edit={{
                featureGroup: editableGroup,
                edit: true,
                remove: true,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default CustomPolygon;
