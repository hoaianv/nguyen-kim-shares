import { i18nText } from "@/lib/i18nText";
import { getAll } from "@/apis/models/contact.apis";
import ContactForm from "@/components/contact/ContactForm";
import { getValidData } from "@/lib/utils";

export default async function page() {
  const response = await getAll();

  const data = getValidData(response);

  return (
    <div
      className="pt-3 mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20"
    >
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{i18nText("AUTO.app.lien.he.gop.y.line18_0_lien_he_gop_y")}</h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-[600px] mx-auto">{i18nText("AUTO.app.lien.he.gop.y.line21_1_chung_toi_luon_lang_nghe")}<br className="hidden sm:block" />{i18nText("AUTO.app.lien.he.gop.y.line25_2_xin_chan_thanh_cam_on")}</p>
        </div>

        {/* Form */}
        <div className="max-w-[600px] mx-auto">
          <ContactForm categories={data ?? []} />
        </div>
      </div>
    </div>
  );
}
