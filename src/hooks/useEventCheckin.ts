"use client";

import { i18nText } from "@/lib/i18nText";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IPagination } from "@/interfaces/common";
import { EMPTY_PAGINATION } from "@/constants";
import { CONST_APIS } from "@/constants/apis.constant";
import { CONST_VALUES } from "@/constants/values.constant";
import { getValidData } from "@/lib/utils";
import { toast } from "sonner";
import {
  IEventCheckinGuest,
  IEventCheckinStats,
  IEventCheckinListData,
  IEventCheckinGuestPayload,
} from "@/interfaces/models/IEventCheckin.interface";
import {
  getEventCheckinList,
  createEventCheckinGuest,
  updateEventCheckinGuest,
  deleteEventCheckinGuest,
  bulkDeleteEventCheckinGuests,
} from "@/apis/models/eventCheckin.apis";

const EMPTY_STATS: IEventCheckinStats = {
  total: 0,
  checkedIn: 0,
  notCheckedIn: 0,
};

export function useEventCheckin() {
  // ═══ DATA ═══
  const [guests, setGuests] = useState<IEventCheckinGuest[]>([]);
  const [stats, setStats] = useState<IEventCheckinStats>(EMPTY_STATS);
  const [pagination, setPagination] = useState<IPagination>(EMPTY_PAGINATION);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // ═══ URL PARAMS ═══
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status") ?? "";
  const keyword = searchParams.get("q") ?? "";
  const page = searchParams.get("page") ?? "1";

  // ═══ SELECTION ═══
  const [selectedGuests, setSelectedGuests] = useState<IEventCheckinGuest[]>(
    []
  );
  const [selectionResetKey, setSelectionResetKey] = useState(0);

  // ═══ MODAL STATE ═══
  const [formModal, setFormModal] = useState<{
    open: boolean;
    guest: IEventCheckinGuest | null;
  }>({ open: false, guest: null });

  const [qrModal, setQrModal] = useState<{
    open: boolean;
    guest: IEventCheckinGuest | null;
  }>({ open: false, guest: null });

  const [importModalOpen, setImportModalOpen] = useState(false);

  // ═══ FETCH ═══
  const fetchGuests = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getEventCheckinList({ status, q: keyword, page });
      const data = getValidData<IEventCheckinListData>(result);
      if (data) {
        setGuests(data.items);
        setPagination(data.pagination);
        setStats(data.stats);
      } else {
        setGuests([]);
        setPagination(EMPTY_PAGINATION);
        setStats(EMPTY_STATS);
      }
    } catch {
      setGuests([]);
      setPagination(EMPTY_PAGINATION);
      setStats(EMPTY_STATS);
      toast.error(i18nText("AUTO.hooks.useeventcheckin.line84_0_khong_du_lieu"), {
        description: i18nText("AUTO.hooks.useeventcheckin.line85_1_vui_long_thu_lai_sau"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [status, keyword, page]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // ═══ URL SYNC ═══
  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const setStatus = useCallback(
    (s: string) => setFilter("status", s),
    [setFilter]
  );
  const setKeyword = useCallback(
    (q: string) => setFilter("q", q),
    [setFilter]
  );

  // ═══ SELECTION ═══
  const handleSelectionChange = useCallback((rows: IEventCheckinGuest[]) => {
    setSelectedGuests(rows);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedGuests([]);
    setSelectionResetKey((k) => k + 1);
  }, []);

  // ═══ MODAL CONTROLS ═══
  const openCreateForm = useCallback(
    () => setFormModal({ open: true, guest: null }),
    []
  );
  const openEditForm = useCallback(
    (guest: IEventCheckinGuest) => setFormModal({ open: true, guest }),
    []
  );
  const closeFormModal = useCallback(
    () => setFormModal({ open: false, guest: null }),
    []
  );
  const openQrModal = useCallback(
    (guest: IEventCheckinGuest) => setQrModal({ open: true, guest }),
    []
  );
  const closeQrModal = useCallback(
    () => setQrModal({ open: false, guest: null }),
    []
  );

  const openImportModal = useCallback(() => setImportModalOpen(true), []);
  const closeImportModal = useCallback(() => setImportModalOpen(false), []);

  // ═══ CRUD ═══
  const createGuest = useCallback(
    async (data: IEventCheckinGuestPayload): Promise<boolean> => {
      try {
        const result = await createEventCheckinGuest(data);
        if (result?.status && result?.errorCode === 200) {
          toast.success(i18nText("AUTO.hooks.useeventcheckin.line159_2_them_khach_thanh_cong"), { position: "top-center" });
          closeFormModal();
          fetchGuests();
          return true;
        }
        toast.error(result?.message || i18nText("AUTO.hooks.useeventcheckin.extra165_0_them_khach_that_bai"), {
          position: "top-center",
        });
        return false;
      } catch {
        toast.error(i18nText("AUTO.hooks.useeventcheckin.line169_3_loi_xay_ra"), { position: "top-center" });
        return false;
      }
    },
    [closeFormModal, fetchGuests]
  );

  const updateGuest = useCallback(
    async (id: number, data: IEventCheckinGuestPayload): Promise<boolean> => {
      try {
        const result = await updateEventCheckinGuest(id, data);
        if (result?.status && result?.errorCode === 200) {
          toast.success(i18nText("AUTO.hooks.useeventcheckin.line181_4_cap_nhat_thanh_cong"), { position: "top-center" });
          closeFormModal();
          fetchGuests();
          return true;
        }
        toast.error(result?.message || i18nText("AUTO.hooks.useeventcheckin.extra187_1_cap_nhat_that_bai"), {
          position: "top-center",
        });
        return false;
      } catch {
        toast.error(i18nText("AUTO.hooks.useeventcheckin.line191_5_loi_xay_ra"), { position: "top-center" });
        return false;
      }
    },
    [closeFormModal, fetchGuests]
  );

  const deleteGuest = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        const result = await deleteEventCheckinGuest(id);
        if (result?.status && result?.errorCode === 200) {
          toast.success(i18nText("AUTO.hooks.useeventcheckin.line203_6_xoa_thanh_cong"), { position: "top-center" });
          fetchGuests();
          return true;
        }
        toast.error(result?.message || i18nText("AUTO.hooks.useeventcheckin.extra208_2_xoa_that_bai"), {
          position: "top-center",
        });
        return false;
      } catch {
        toast.error(i18nText("AUTO.hooks.useeventcheckin.line212_7_loi_xay_ra"), { position: "top-center" });
        return false;
      }
    },
    [fetchGuests]
  );

  const bulkDelete = useCallback(async (): Promise<boolean> => {
    if (selectedGuests.length === 0) return false;
    try {
      const ids = selectedGuests.map((g) => g.id);
      const result = await bulkDeleteEventCheckinGuests(ids);
      if (result?.status && result?.errorCode === 200) {
        toast.success(i18nText("AUTO.hooks.useeventcheckin.line225_8_da_xoa_khach", { value0: ids.length }), {
          position: "top-center",
        });
        clearSelection();
        fetchGuests();
        return true;
      }
      toast.error(result?.message || i18nText("AUTO.hooks.useeventcheckin.extra233_3_xoa_that_bai"), {
        position: "top-center",
      });
      return false;
    } catch {
      toast.error(i18nText("AUTO.hooks.useeventcheckin.line237_9_loi_xay_ra"), { position: "top-center" });
      return false;
    }
  }, [selectedGuests, clearSelection, fetchGuests]);

  const importExcel = useCallback(
    async (formData: FormData): Promise<boolean> => {
      try {
        const { importEventCheckinGuests } = await import(
          "@/apis/models/eventCheckin.apis"
        );
        const result = await importEventCheckinGuests(formData);
        if (result?.status && result?.errorCode === 200) {
          toast.success(i18nText("AUTO.hooks.useeventcheckin.line250_10_import_hanh_cong"), { position: "top-center" });
          fetchGuests();
          closeImportModal();
          return true;
        }
        toast.error(result?.message || i18nText("AUTO.hooks.useeventcheckin.extra256_4_import_that_bai"), {
          position: "top-center",
        });
        return false;
      } catch {
        toast.error(i18nText("AUTO.hooks.useeventcheckin.line260_11_loi_xay_ra"), { position: "top-center" });
        return false;
      }
    },
    [fetchGuests, closeImportModal]
  );

  // ═══ EXPORT EXCEL ═══
  const exportExcel = useCallback(async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (keyword) params.set("q", keyword);

      const url = `/api/export-participants?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `danh-sach-khach-moi-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success(i18nText("AUTO.hooks.useeventcheckin.line295_12_export_thanh_cong"), { position: "top-center" });
    } catch {
      toast.error(i18nText("AUTO.hooks.useeventcheckin.line297_13_export_that_bai"), {
        description: i18nText("AUTO.hooks.useeventcheckin.line298_14_vui_long_thu_lai_sau"),
        position: "top-center",
      });
    } finally {
      setExporting(false);
    }
  }, [status, keyword]);

  return {
    guests,
    stats,
    pagination,
    loading,
    exporting,
    status,
    keyword,
    setStatus,
    setKeyword,
    selectedGuests,
    handleSelectionChange,
    clearSelection,
    selectionResetKey,
    formModal,
    qrModal,
    importModalOpen,
    openCreateForm,
    openEditForm,
    closeFormModal,
    openQrModal,
    closeQrModal,
    openImportModal,
    closeImportModal,
    createGuest,
    updateGuest,
    deleteGuest,
    bulkDelete,
    exportExcel,
    importExcel,
  };
}
