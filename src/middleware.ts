import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONST_VALUES } from "@/constants/values.constant";
import { checkToken } from "@/apis/common/auth.apis";
import { getValidData } from "@/lib/utils";

const LOGIN = "/login";
const PROTECTED_BASE = [
  "/tai-khoan",
  "/dat-hang",
  "/gio-hang",
  "/thanh-toan",
  "/su-kien-checkin",
] as const;
const PROTECTED_REGEX = PROTECTED_BASE.map(
  (b) => new RegExp(`^${b.replace("/", "\\/")}(?:\\/|$)`)
);

function isProtected(pathname: string) {
  if (pathname.startsWith("/su-kien-checkin/xac-nhan")) {
    return false;
  }
  return PROTECTED_REGEX.some((re) => re.test(pathname));
}

async function isAuthed() {
  try {
    const response = await checkToken();
    const data = getValidData(response);

    return data?.auth;
  } catch {
    return null;
  }
}
/**
 * Verify token với backend API
 */

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(CONST_VALUES.TOKEN)?.value;

  // Trang đăng nhập
  if (/^\/login(?:\/|$)/.test(pathname)) {
    if (token) {
      // Verify token trước khi redirect
      const isValid = await isAuthed();

      if (isValid) {
        const next = request.nextUrl.searchParams.get("next");
        return NextResponse.redirect(
          new URL(next || "/tai-khoan", request.url)
        );
      } else {
        // Token không hợp lệ, xóa cookie và cho phép đăng nhập lại
        const response = NextResponse.next();
        response.cookies.delete(CONST_VALUES.TOKEN);
        return response;
      }
    }
    return NextResponse.next();
  }

  // Các route yêu cầu xác thực
  if (isProtected(pathname)) {
    if (!token) {
      const url = new URL(LOGIN, request.url);
      url.searchParams.set("next", pathname + search);
      return NextResponse.redirect(url);
    }

    // Verify token với backend
    const isValid = await isAuthed();

    if (!isValid) {
      // Token không hợp lệ, xóa cookie và redirect về login
      const url = new URL(LOGIN, request.url);
      url.searchParams.set("next", pathname + search);
      const response = NextResponse.redirect(url);
      response.cookies.delete(CONST_VALUES.TOKEN);
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/tai-khoan/:path*",
    "/dat-hang/:path*",
    "/gio-hang/:path*",
    "/thanh-toan/:path*",
    "/su-kien-checkin/:path*",
  ],
};
