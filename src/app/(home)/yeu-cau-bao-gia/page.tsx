import { i18nText } from "@/lib/i18nText";
import QuoteForm from "@/components/quote/QuoteForm";

export default async function page() {
  return (
    <div
      className="pt-3 mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20
"
    >
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{i18nText("AUTO.app.yeu.cau.bao.gia.line14_0_yeu_cau_bao_gia")}</h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-[500px] mx-auto">{i18nText("AUTO.app.yeu.cau.bao.gia.line17_1_vui_long_dien_day_du")}</p>
        </div>

        {/* Form */}
        <div className="max-w-[600px] mx-auto">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
