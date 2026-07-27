import { categoryParentList } from "@/apis/models/category.apis";
import CategoryParentTabs from "./CategoryParentTabs";

export default async function CategoryParentTabsServer() {
  const res = await categoryParentList();
  const categories = Array.isArray(res?.data) ? res.data : [];
  if (categories.length === 0) return null;
  return <CategoryParentTabs categories={categories} />;
}
