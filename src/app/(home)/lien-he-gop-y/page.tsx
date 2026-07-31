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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Liên hệ & Góp ý
          </h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-[600px] mx-auto">
            Chúng tôi luôn lắng nghe ý kiến của bạn. Vui lòng để lại thông tin
            và nội dung góp ý, bộ phận chăm sóc khách hàng sẽ phản hồi trong
            thời gian sớm nhất.
            <br className="hidden sm:block" />
            Xin chân thành cảm ơn sự tin tưởng và đồng hành của Quý khách!
          </p>
        </div>

        {/* Form */}
        <div className="max-w-[600px] mx-auto">
          <ContactForm categories={data ?? []} />
        </div>
      </div>
    </div>
  );
}
