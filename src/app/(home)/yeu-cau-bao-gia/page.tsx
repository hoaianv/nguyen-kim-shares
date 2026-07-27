import QuoteForm from "@/components/quote/QuoteForm";

export default async function page() {
  return (
    <div
      className="mt-3 mx-auto h-full w-full max-w-7xl 2xl:max-w-[1520px]
px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20
"
    >
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Yêu cầu báo giá
          </h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-[500px] mx-auto">
            Vui lòng điền đầy đủ thông tin bên dưới. Chúng tôi sẽ phản hồi và
            gửi báo giá chi tiết đến bạn trong thời gian sớm nhất.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-[600px] mx-auto">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}

