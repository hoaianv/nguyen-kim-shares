import CardPromotion from "@/components/promotion/cardPromotion";
import { IPromotion } from "@/interfaces/models/IPromotion.interface";

export default function Promotion({ data }: { data?: IPromotion[] }) {
  return (
    <div
      className="col-span-1 
      lg:col-span-3 
      order-2"
    >
      <div
        className="grid 
        grid-cols-1 
        gap-3
        sm:grid-cols-2 
        lg:grid-cols-1"
      >
        {data?.map((item) => (
          <CardPromotion key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
