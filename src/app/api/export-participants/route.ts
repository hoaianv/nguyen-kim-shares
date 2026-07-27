import { NextRequest, NextResponse } from "next/server";
import { CONST_APIS } from "@/constants/apis.constant";
import { CONST_VALUES } from "@/constants/values.constant";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const backendUrl = new URL(
      `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.EVENT_CHECKIN}`
    );

    // Forwarding params
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });
    // Ensure export flag is set
    backendUrl.searchParams.set("export", "true");

    // Get auth token from cookies (which is automatically managed by the application)
    const token = cookies().get(CONST_VALUES.TOKEN)?.value;

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Export failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("Content-Type") || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const contentDisposition = response.headers.get("Content-Disposition") || 'attachment; filename="export.xlsx"';

    const readableStream = Buffer.from(await response.arrayBuffer());

    return new NextResponse(readableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
