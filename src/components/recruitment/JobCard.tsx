import { i18nText } from "@/lib/i18nText";
import { IHirePost } from "@/interfaces/models/IRecruitment.interfaces";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JobCard = ({ item }: { item: IHirePost }) => {
  return (
    <div className="group max-w-sm bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
      <Link href={`/tuyen-dung/${item.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.picture}
            alt={item.name}
            fill
            className="object-contain"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent"></div>

          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm rounded-full border border-white/20">
              {item.form}
            </span>
          </div>

          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-600/90 backdrop-blur-sm rounded-full border border-white/20">
              <Users className="w-3 h-3" />
              <span>{item.quantity}{i18nText("AUTO.components.recruitment.jobcard.line36_0_vi_tri")}</span>
            </div>
          </div>

          {/* Job Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-lg font-bold leading-tight group-hover:text-yellow-300 transition-colors duration-300">
              {item.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-3 space-y-4">
        <div className="flex items-center gap-2 text-green-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold text-sm">{item.salary}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600  ">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{item.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 ">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{i18nText("AUTO.components.recruitment.jobcard.line63_1_kinh_nghiem")}{item.experience}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600  ">
            <Calendar className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{i18nText("AUTO.components.recruitment.jobcard.line69_2_han_nop")}{item.deadline}
            </span>
          </div>
        </div>

        {/* Position and Degree */}
        <div className="flex items-center justify-between my-3">
          <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            {item.position}
          </span>
          <span className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
            {item.degree}
          </span>
        </div>

        <div className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
          <Link href={`/tuyen-dung/${item.slug}`}>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{i18nText("AUTO.components.recruitment.jobcard.line88_3_ung_tuyen_ngay")}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-300 pointer-events-none"></div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default JobCard;

