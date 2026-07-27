import { getMeta } from "@/apis/models/policy.apis";
import { metaNotFound } from "@/constants";
import { LayoutProps } from "@/interfaces/common";
import { getValidData } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: LayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const response = await getMeta(slug);
  const data = getValidData(response);

  if (!data) return metaNotFound;

  return data;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
