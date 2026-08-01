"use client";

import { i18nText } from "@/lib/i18nText";
import { Download } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { IEventCheckinGuest } from "@/interfaces/models/IEventCheckin.interface";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: IEventCheckinGuest | null;
}

export default function QrCodeModal({
  isOpen,
  onClose,
  guest,
}: QrCodeModalProps) {
  if (!guest) return null;

  const handleDownload = () => {
    if (!guest.qrCode) return;
    const link = document.createElement("a");
    link.href = guest.qrCode;
    link.download = `qr-${guest.name.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={i18nText("AUTO.components.eventcheckin.qrcodemodal.line31_0_ma_qr_check_in")} size="sm">
      <div className="flex flex-col items-center py-4 space-y-5">
        {/* QR Image */}
        {guest.qrCode ? (
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <img
              src={guest.qrCode}
              alt={`QR - ${guest.name}`}
              className="w-56 h-56 object-contain"
            />
          </div>
        ) : (
          <div className="w-56 h-56 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-sm text-gray-400">{i18nText("AUTO.components.eventcheckin.qrcodemodal.line44_1_chua_ma_qr")}</span>
          </div>
        )}

        {/* Guest info */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-gray-900">{guest.name}</p>
          <p className="text-sm text-gray-500">{guest.companyName}</p>
        </div>

        {/* Download button */}
        {guest.qrCode && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />{i18nText("AUTO.components.eventcheckin.qrcodemodal.line61_2_ma_qr")}</button>
        )}
      </div>
    </Modal>
  );
}
