"use client";

import { ClipboardCheck } from "lucide-react";
import { useEventCheckin } from "@/hooks/useEventCheckin";
import EventCheckinStats from "@/components/eventCheckin/EventCheckinStats";
import EventCheckinFilters from "@/components/eventCheckin/EventCheckinFilters";
import EventCheckinTable from "@/components/eventCheckin/EventCheckinTable";
import GuestFormModal from "@/components/eventCheckin/GuestFormModal";
import QrCodeModal from "@/components/eventCheckin/QrCodeModal";
import ImportGuestModal from "@/components/eventCheckin/ImportGuestModal";

export default function EventCheckinPage() {
  const {
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
    selectionResetKey,
    openCreateForm,
    openEditForm,
    openQrModal,
    bulkDelete,
    exportExcel,
    deleteGuest,
    formModal,
    closeFormModal,
    createGuest,
    updateGuest,
    qrModal,
    closeQrModal,
    importModalOpen,
    openImportModal,
    closeImportModal,
    importExcel,
  } = useEventCheckin();

  return (
    <div className="min-h-[80vh] py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ HEADER ═══ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-sm">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Quản lý Check-in Sự kiện
              </h1>
              <p className="text-sm text-gray-500">
                Quản lý danh sách khách mời và trạng thái check-in
              </p>
            </div>
          </div>
        </div>

        {/* ═══ STATS ═══ */}
        <EventCheckinStats stats={stats} />

        {/* ═══ FILTERS + ACTIONS ═══ */}
        <EventCheckinFilters
          status={status}
          keyword={keyword}
          selectedCount={selectedGuests.length}
          exporting={exporting}
          onStatusChange={setStatus}
          onKeywordChange={setKeyword}
          onAddGuest={openCreateForm}
          onBulkDelete={bulkDelete}
          onExport={exportExcel}
          onImport={openImportModal}
        />

        {/* ═══ TABLE ═══ */}
        <EventCheckinTable
          data={guests}
          loading={loading}
          pagination={pagination}
          onEdit={openEditForm}
          onDelete={(guest) => deleteGuest(guest.id)}
          onViewQr={openQrModal}
          onSelectionChange={handleSelectionChange}
          selectionResetKey={selectionResetKey}
        />
      </div>

      {/* ═══ MODALS ═══ */}
      <GuestFormModal
        isOpen={formModal.open}
        onClose={closeFormModal}
        guest={formModal.guest}
        onCreate={createGuest}
        onUpdate={updateGuest}
      />

      <QrCodeModal
        isOpen={qrModal.open}
        onClose={closeQrModal}
        guest={qrModal.guest}
      />

      <ImportGuestModal
        isOpen={importModalOpen}
        onClose={closeImportModal}
        onImport={importExcel}
      />
    </div>
  );
}
