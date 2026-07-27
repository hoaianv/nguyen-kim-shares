import { IAdPosition } from "@/interfaces/models/IAdvertise.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CertificatesProps {
  data: IAdPosition;
}

const Certificates: React.FC<CertificatesProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <div className="flex items-end justify-between border-b-2 border-[#ffb716] pb-2">
        <h3 className="text-sm font-extrabold uppercase text-slate-950">
          {data?.title ?? ""}
        </h3>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {data.advertises.map((item) => (
          <Link
            href={item?.link ?? ""}
            target={item?.target ?? "_blank"}
            key={item?.id}
            className="group block"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-slate-200 bg-white transition duration-200 group-hover:border-[#ffb716]">
              <Image
                src={item?.picture ?? ""}
                alt={item?.title ?? ""}
                fill
                className="object-contain p-2.5 transition duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
