import PoliciesCard from "@/components/product/PoliciesCard";
import { getAll } from "@/apis/models/policy.apis";
import type {
  IPolicy,
  IResponsePolicy,
} from "@/interfaces/models/IPolicy.interfaces";

type Item = { label: string; href: string };

export default async function PoliciesCardServer() {
  try {
    const res: IResponsePolicy = await getAll();
    const list: IPolicy[] = Array.isArray(res?.data) ? res.data : [];

    const items: Item[] = list.map((p) => ({
      label: p.title,
      href: p.url?.startsWith("/") ? p.url : `/${p.url}`,
    }));

    return <PoliciesCard items={items.length ? items : undefined} />;
  } catch {
    return <PoliciesCard />;
  }
}
