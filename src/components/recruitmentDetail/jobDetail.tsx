"use client";

import Image from "next/image";
import { IHirePost } from "@/interfaces/models/IRecruitment.interfaces";
import { IBreadcrumb } from "@/interfaces/common";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import FormApply from "@/components/recruitmentDetail/FormApply";
import DownloadDoc from "@/components/recruitmentDetail/DownloadDoc";
import { useTranslations } from "next-intl";
import Link from "next/link";

// UI Components
import Button from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "../ui/Badge";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Users,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  Languages,
  TrendingUp,
  Award,
} from "lucide-react";

interface JobDetailProps {
  data: {
    job: IHirePost;
    breadcrumb: IBreadcrumb[];
  };
  relatedJobs: IHirePost[];
}

export default function JobDetail({ data, relatedJobs }: JobDetailProps) {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations();
  const { job } = data;

  return (
    <>
      <div className="min-h-screen bg-muted/30 bg-gray-50">
        {/* Main Content */}
        <main className="container mx-auto max-w-full px-4 py-8">
          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="min-w-0 space-y-6 lg:col-span-2">
              {/* Job Header Card */}
              <Card className="min-w-0 max-w-full border-none bg-white shadow-sm min-h-[220px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[280px]">
                <CardContent className="flex h-full min-w-0 flex-col justify-center p-4 sm:p-4">
                  <div className="min-w-0 space-y-4">
                    <div className="min-w-0">
                      <h1 className="mb-2 break-words text-3xl font-bold text-balance text-[#1435C3]">
                        {job?.name}
                      </h1>
                    </div>

                    <div className="grid min-w-0 grid-cols-2 gap-3 rounded-lg border border-[#eab108]/20 bg-gradient-to-br from-[#eab108]/10 to-[#d4a006]/5 p-4 md:grid-cols-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          Mức lương
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Wallet className="h-4 w-4 text-[#eab108]" />
                          <span>{job?.salary}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          Kinh nghiệm
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Briefcase className="h-4 w-4 text-[#1435C3]" />
                          <span>{job?.experience}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          {t("PRODUCT.quantity")}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Users className="h-4 w-4 text-[#1435C3]" />
                          <span>{job?.quantity} người</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          Hình thức
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Clock className="h-4 w-4 text-[#1435C3]" />
                          <span>{job?.form}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          Bằng cấp
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <GraduationCap className="h-4 w-4 text-[#1435C3]" />
                          <span>{job?.degree}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                          Hạn nộp
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-[#1435C3]" />
                          <span>{job?.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 break-words">{job?.address}</span>
                    </div>

                    <div className="flex min-w-0 flex-wrap items-center gap-3 pt-2">
                      <Button
                        onClick={() => setOpen(true)}
                        className="h-10 min-w-0 flex-1 border-none bg-gradient-to-r from-[#FFD500] to-[#F59E0B] px-6 font-medium text-white shadow-sm transition-all hover:from-[#F59E0B] hover:to-[#D97706] sm:flex-none"
                      >
                        Ứng tuyển ngay
                      </Button>

                      <DownloadDoc className="h-10 min-w-0 flex-1 px-6 sm:flex-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card className="min-w-0 max-w-full border-none bg-white shadow-sm">
                <CardContent className="min-w-0 space-y-6 p-4 sm:p-4">
                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-[#1435C3]">
                      Chi tiết công việc
                    </h2>
                    <div
                      className="prose prose-base max-w-none prose-headings:text-[#1435C3] prose-a:text-[#1435C3] hover:prose-a:text-[#FFD500] text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: job?.information ?? "",
                      }}
                    />
                  </section>

                  {/* Additional Info Grid based on available data */}
                  <section className="pt-6 border-t">
                    <h2 className="text-xl font-semibold mb-4 text-[#1435C3]">
                      Thông tin tóm tắt
                    </h2>
                    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-[#1435C3] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                            VỊ TRÍ
                          </div>
                          <div className="text-sm font-medium">
                            {job?.position}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-[#1435C3] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                            BẰNG CẤP
                          </div>
                          <div className="text-sm font-medium">
                            {job?.degree}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-[#1435C3] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                            KINH NGHIỆM
                          </div>
                          <div className="text-sm font-medium">
                            {job?.experience}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Languages className="h-5 w-5 text-[#1435C3] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                            HÌNH THỨC
                          </div>
                          <div className="text-sm font-medium">{job?.form}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#1435C3] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1 text-gray-500">
                            ĐỊA ĐIỂM LÀM VIỆC
                          </div>
                          <div className="text-sm font-medium">
                            {job?.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="min-w-0 space-y-6">
              {/* Company Card */}
              <Card className="min-w-0 max-w-full overflow-hidden border-none bg-white shadow-sm min-h-[220px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[280px]">
                {/* Banner Background */}
                <div className="h-24 relative overflow-hidden bg-gray-100">
                  <Image
                    src={`/images/banner-recruiment.jpg`}
                    alt="Company banner"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/10" />
                </div>

                <CardContent className="relative flex h-full min-w-0 flex-col items-center justify-center p-6 pt-0">
                  {/* Logo Centered & Overlapping */}
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="h-24 w-24 rounded-xl bg-white border shadow-sm flex items-center justify-center p-2 relative z-10">
                      {job?.picture ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={job.picture}
                            alt={job.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <Building2 className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="min-w-0 space-y-3 text-center">
                    <h3 className="break-words text-lg font-bold text-gray-900">
                      Công ty TNHH Vi tính Nguyên Kim
                    </h3>

                    <div className="flex min-w-0 items-start justify-center gap-3 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                      <div className="text-left leading-relaxed whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                        245B Trần Quang Khải, Phường Tân Định, TP. Hồ Chí Minh
                      </div>
                    </div>

                    <a
                      href="https://maps.google.com/?q=245B Trần Quang Khải, Phường Tân Định, Quận 1, TP. Hồ Chí Minh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1435C3] text-sm inline-block hover:underline font-medium"
                    >
                      (Xem bản đồ)
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              {relatedJobs?.length > 0 && (
                <Card className="min-w-0 max-w-full border-none bg-white shadow-sm">
                  <CardContent className="min-w-0 space-y-4 p-4 sm:p-4">
                    <h3 className="font-semibold">Việc làm liên quan</h3>

                    <div className="space-y-3">
                      {relatedJobs.map((item) => (
                        <Link
                          key={item.id}
                          href={`/tuyen-dung/${item.slug}`}
                          className="block min-w-0 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-sm"
                        >
                          <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-[#1435C3] mb-1 truncate">
                                {item.name}
                              </h4>

                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <Wallet className="h-3.5 w-3.5" />
                                  <span>{item.salary}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span className="line-clamp-1">
                                    {item.address}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-shrink-0 ml-2">
                              <Badge
                                variant="secondary"
                                className="text-xs bg-[#eab108]/10 text-[#eab108] border-[#eab108]/20"
                              >
                                {item.position}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="lg"
        title={`Ứng tuyển vị trí: ${data.job.name}`}
      >
        <FormApply />
      </Modal>
    </>
  );
}
