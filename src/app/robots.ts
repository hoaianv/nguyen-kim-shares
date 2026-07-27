import { CONST_APIS } from "@/constants/apis.constant";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = CONST_APIS.DOMAIN || "https://nguyenkimcomputer.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // Chặn bot truy cập API
        "/tai-khoan/", // Chặn trang thông tin tài khoản
        "/gio-hang", // Chặn trang giỏ hàng (nội dung thay đổi liên tục, không có giá trị SEO)
        "/thanh-toan", // Chặn trang thanh toán
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
