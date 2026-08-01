"use client";

import { i18nText } from "@/lib/i18nText";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, AlertCircle, User, Mail, Phone, Building, Briefcase, CalendarCheck } from "lucide-react";
import { checkinEventGuest } from "@/apis/models/eventCheckin.apis";
import { IEventCheckinGuest, ECheckinStatus } from "@/interfaces/models/IEventCheckin.interface";

type CheckinState = "loading" | "info" | "confirming" | "success" | "error" | "invalid";

function CheckinContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  const [state, setState] = useState<CheckinState>("loading");
  const [message, setMessage] = useState<string>(i18nText("AUTO.app.standalone.su.kien.checkin.extra17_0_dang_thong_tin_khach_moi"));
  const [guestData, setGuestData] = useState<IEventCheckinGuest | null>(null);

  useEffect(() => {
    // Prevent double execution in dev mode or unnecessary calls
    if (!uid) {
      setState("invalid");
      setMessage(i18nText("AUTO.app.standalone.su.kien.checkin.extra24_1_ma_qr_khong_hop_le"));
      return;
    }

    let isMounted = true;

    const fetchGuestInfo = async () => {
      try {
        const result = await checkinEventGuest(uid);
        if (!isMounted) return;

        if (result?.status && result?.errorCode === 200 && result?.data) {
          setGuestData(result.data);

          if (result.data.status === ECheckinStatus.Checked) {
            setState("success");
            setMessage(i18nText("AUTO.app.standalone.su.kien.checkin.extra40_2_khach_moi_nay_da_duoc"));
          } else {
            setState("info");
          }
        } else {
          setState("error");
          setMessage(
            result?.message ||
            i18nText("AUTO.app.standalone.su.kien.checkin.extra48_3_khong_tim_thay_thong_tin"),
          );
        }
      } catch (error) {
        if (!isMounted) return;
        setState("error");
        setMessage(i18nText("AUTO.app.standalone.su.kien.checkin.extra54_4_loi_ket_noi_vui_long"));
      }
    };

    fetchGuestInfo();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  const handleConfirmCheckin = async () => {
    if (!uid) return;

    setState("confirming");
    try {
      const result = await checkinEventGuest(uid, true);

      if (result?.status && result?.errorCode === 200) {
        setState("success");
        setMessage(i18nText("AUTO.app.standalone.su.kien.checkin.extra74_5_check_in_thanh_cong_chao"));
      } else {
        setState("error");
        setMessage(result?.message || i18nText("AUTO.app.standalone.su.kien.checkin.extra77_6_check_in_that_bai_vui"));
      }
    } catch (error) {
      setState("error");
      setMessage(i18nText("AUTO.app.standalone.su.kien.checkin.extra81_7_loi_ket_noi_khi_xac"));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
      <div className={`p-6 sm:p-8 flex flex-col items-center justify-center relative transition-colors duration-500
        ${state === 'success' ? 'bg-emerald-500 text-white pb-10' : ''}
        ${state === 'error' || state === 'invalid' ? 'bg-red-500 text-white pb-10' : ''}
        ${state === 'loading' || state === 'confirming' || state === 'info' ? 'pt-10' : 'pt-10'}
      `}>
        {/* Dynamic Header Illustration */}
        {state === "loading" || state === "confirming" ? (
          <>
            <Loader2 className={`w-16 h-16 animate-spin mb-4 ${state === 'confirming' ? 'text-blue-500' : 'text-slate-400'}`} />
            <h2 className={`text-xl font-bold ${state === 'confirming' ? 'text-slate-800' : 'text-slate-800'}`}>
              {state === "confirming" ? i18nText("AUTO.app.standalone.su.kien.checkin.line96_0_dang_xac_nhan") : i18nText("AUTO.app.standalone.su.kien.checkin.line96_1_dang_xu_ly")}
            </h2>
          </>
        ) : state === "success" ? (
          <>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold">{i18nText("AUTO.app.standalone.su.kien.checkin.line104_2_thanh_cong")}</h2>
          </>
        ) : state === "error" || state === "invalid" ? (
          <>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              {state === "error" ? <XCircle className="w-10 h-10 text-white" /> : <AlertCircle className="w-10 h-10 text-white" />}
            </div>
            <h2 className="text-2xl font-bold">{state === "error" ? i18nText("AUTO.app.standalone.su.kien.checkin.line111_3_that_bai") : i18nText("AUTO.app.standalone.su.kien.checkin.line111_4_khong_hop_le")}</h2>
          </>
        ) : state === "info" ? (
          <>
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <CalendarCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{i18nText("AUTO.app.standalone.su.kien.checkin.line118_5_xac_nhan_thong_tin")}</h2>
            <p className="text-slate-500 text-sm mt-1">{i18nText("AUTO.app.standalone.su.kien.checkin.line119_6_vui_long_kiem_tra_lai")}</p>
          </>
        ) : null}
      </div>

      {/* Detail Content Section */}
      <div className={`px-6 sm:px-8 pb-8 ${state === 'success' || state === 'error' || state === 'invalid' ? 'pt-6 bg-white rounded-t-[2rem] -mt-6' : 'pt-4'}`}>
        {(state === "loading" || state === "confirming") && (
          <div className="text-center pt-2">
            <p className="text-slate-500 text-sm">{state === "confirming" ? i18nText("AUTO.app.standalone.su.kien.checkin.line128_7_he_thong_dang_luu_trang") : message}</p>
          </div>
        )}

        {(state === "info" || state === "success") && guestData && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200 flex items-center gap-2">{i18nText("AUTO.app.standalone.su.kien.checkin.line136_8_thong_tin_khach_moi")}</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{i18nText("AUTO.app.standalone.su.kien.checkin.line145_9_ho_ten")}</p>
                    <p className="text-base font-bold text-slate-800">{guestData.name}</p>
                  </div>
                </div>

                {guestData.companyName && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex flex-col items-center shrink-0">
                      <Building className="w-5 h-5 text-slate-400 mt-2" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{i18nText("AUTO.app.standalone.su.kien.checkin.line156_10_cong_ty")}</p>
                      <p className="text-sm font-semibold text-slate-700">{guestData.companyName}</p>
                    </div>
                  </div>
                )}

                {guestData.position && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex flex-col items-center shrink-0">
                      <Briefcase className="w-5 h-5 text-slate-400 mt-1" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{i18nText("AUTO.app.standalone.su.kien.checkin.line168_11_chuc_vu")}</p>
                      <p className="text-sm font-semibold text-slate-700">{guestData.position}</p>
                    </div>
                  </div>
                )}

                {(guestData.phone || guestData.email) && (
                  <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-slate-200">
                    {guestData.phone && (
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Phone className="w-3 h-3" />{i18nText("AUTO.app.standalone.su.kien.checkin.line178_12_so_dien_thoai")}</p>
                        <p className="text-sm font-medium text-slate-800 break-all">{guestData.phone}</p>
                      </div>
                    )}
                    {guestData.email && (
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Mail className="w-3 h-3" />{i18nText("AUTO.app.standalone.su.kien.checkin.extra183_8_email")}</p>
                        <p className="text-sm font-medium text-slate-800 break-all">{guestData.email}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {state === "info" && (
              <button
                onClick={handleConfirmCheckin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex justify-center items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />{i18nText("AUTO.app.standalone.su.kien.checkin.line199_13_xac_nhan_check_in")}</button>
            )}

            {state === "success" && (
              <div className="text-center pt-2">
                <p className="text-emerald-600 font-medium">{message}</p>
              </div>
            )}
          </div>
        )}

        {(state === "error" || state === "invalid") && (
          <div className="text-center pt-4">
            <p className="text-slate-600 mb-8">{message}</p>
            {state === "error" && (
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm w-full"
              >{i18nText("AUTO.app.standalone.su.kien.checkin.line219_14_thu_lai")}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckinConfirmationPage() {
  return (
    <div className="min-h-[100dvh] pb-10 bg-slate-50/50 flex flex-col p-4 font-sans before:absolute before:inset-0 before:bg-blue-600/5 before:h-[40vh] before:-z-10 items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full max-w-sm mx-auto bg-white rounded-md  shadow-sm p-12 text-center flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        }
      >
        <CheckinContent />
      </Suspense>
    </div>
  );
}
