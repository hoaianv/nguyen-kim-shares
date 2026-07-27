"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

import { toast } from "sonner";
import { getValidData } from "@/lib/utils";

import { toggle } from "@/apis/models/favorite.apis";
import { useStateStore } from "@/stores/stateStore";

type FavoriteProps = {
  name: string;
  id: number;
  favorite: boolean;
};

const ButtonFavorite = ({ id, favorite, name }: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { setLoading } = useStateStore();

  const handleToggle = async (id: number) => {
    setLoading(true);
    try {
      const response = await toggle(id);
      const isValid = getValidData(response);
      if (isValid) {
        toast.success(response.message, {
          description: `${isValid ? "Đã thêm" : "Đã bỏ"} sản phẩm "${name}" ${
            isValid ? "vào danh sách yêu thích" : "khỏi danh sách yêu thích"
          }`,
          position: "top-center",
        });

        setIsFavorite(isValid.isFavorite);
      } else {
        toast.error(
          response.message ?? "Có lỗi xảy ra khi cập nhật yêu thích",
          {
            position: "top-center",
          }
        );
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Có lỗi xảy ra khi cập nhật yêu thích", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleToggle(id)}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {isFavorite ? (
        <Heart
          className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600 drop-shadow-[0_0_10px_rgba(244,63,94,.55)] transition-transform duration-200"
          fill="currentColor"
        />
      ) : (
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-rose-500 transition-transform duration-200 hover:scale-110" />
      )}
    </button>
  );
};

export default ButtonFavorite;

