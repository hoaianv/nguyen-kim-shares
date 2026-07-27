"use client";

import { IService } from "@/interfaces/models/IServices.interface";
import Image from "next/image";
import Link from "next/link";

interface ServiceProps {
  data: IService;
}

export default function CardService({ data }: ServiceProps) {
  return (
    <Link
      href={`/dich-vu/${data.url}`}
      className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={data.picture}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {data.title}
        </h3>
      </div>
    </Link>
  );
}

