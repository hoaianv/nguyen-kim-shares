import { i18nText } from "@/lib/i18nText";
import React from "react";

interface GoogleMapEmbedProps {
  lat: number;
  lng: number;
  address: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  lat,
  lng,
  address,
}) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOMG0pMKI3TZl0&q=${lat},${lng}&zoom=16&maptype=roadmap`;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-600">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={i18nText("AUTO.components.footer.googlemapembed.line26_0_do", { value0: address })}
        className="filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
};

export default GoogleMapEmbed;

