"use client";
import "swiper/css";
import "swiper/css/navigation";
import { ICategoryNews } from "@/interfaces/models/INews.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Categories({ data }: { data: ICategoryNews[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const setParam = (value?: string) => {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete("danh-muc");
    else next.set("danh-muc", value);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-3 px-8 relative">
      <Swiper
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".nav-button--next",
          prevEl: ".nav-button--prev",
        }}
        modules={[Navigation]}
        spaceBetween={10}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide
            onClick={() => setParam(item.url)}
            className="!w-auto py-2 "
            key={item.id}
          >
            <h3
              title={item.title}
              className="cursor-pointer  inline-block max-w-[420px] truncate select-none
               px-3 py-1 rounded-lg text-sm font-medium
               bg-slate-100 text-slate-800
               transition-all duration-200
               hover:bg-slate-200 hover:shadow-sm hover:-translate-y-0.5
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              {item.title}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute cursor-pointer  left-0 top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-[#A8A8A84D]  flex items-center justify-center z-20  rounded-full nav-button--prev">
        <ArrowLeft size={25} strokeWidth={1.75} />
      </div>
      <div className=" absolute  cursor-pointer   right-0 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center z-20 bg-[#A8A8A84D] rounded-full nav-button--next">
        <ArrowRight size={25} strokeWidth={1.75} />
      </div>
    </div>
  );
}

