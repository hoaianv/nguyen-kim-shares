"use client";

import { Eye, Download } from "lucide-react";

interface QrThumbnailProps {
  qrData: string;
  guestName: string;
  onView: () => void;
}

export default function QrThumbnail({
  qrData,
  guestName,
  onView,
}: QrThumbnailProps) {
  const handleDownload = () => {
    if (!qrData) return;
    const link = document.createElement("a");
    link.href = qrData;
    link.download = `qr-${guestName.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!qrData) {
    return (
      <span className="text-xs text-gray-400 italic">Chưa có QR</span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={qrData}
        alt={`QR - ${guestName}`}
        className="w-9 h-9 rounded border border-gray-200 object-contain bg-white"
      />
      <div className="flex items-center gap-0.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          title="Xem QR"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          title="Tải QR"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
