"use client";
import { i18nText } from "@/lib/i18nText";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { Download } from "lucide-react";
import React, { useState } from "react";

interface DownloadDocProps {
  className?: string;
  fileName?: string;
  ariaLabel?: string;
}

const DownloadDoc: React.FC<DownloadDocProps> = ({
  className,
  fileName = "phieu-thong-tin-ung-vien.doc",
  ariaLabel = i18nText("AUTO.components.recruitmentdetail.downloaddoc.extra16_0_phieu_dien_thong_tin_ung"),
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.DOWNLOAD}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(i18nText("AUTO.components.recruitmentdetail.downloaddoc.extra32_1_khong_file"));
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(i18nText("AUTO.components.recruitmentdetail.downloaddoc.line46_0_loi_xay_ra_khi_file"));
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses =
    "flex items-center justify-center gap-2 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-sm bg-gradient-to-r from-[#1435C3] to-[#335CFF] hover:from-[#0E2DB8] hover:to-[#244DFF] disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      disabled={isLoading}
      className={`${baseClasses} ${className ?? ""}`}
    >
      <Download className="w-4 h-4" />
      <span className="text-sm">{isLoading ? i18nText("AUTO.components.recruitmentdetail.downloaddoc.line66_1_dang") : i18nText("AUTO.components.recruitmentdetail.downloaddoc.line66_2_phieu")}</span>
    </button>
  );
};

export default DownloadDoc;

