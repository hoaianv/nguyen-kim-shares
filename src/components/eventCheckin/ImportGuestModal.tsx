"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, FileSpreadsheet, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner";

interface ImportGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (formData: FormData) => Promise<boolean>;
}

export default function ImportGuestModal({
  isOpen,
  onClose,
  onImport,
}: ImportGuestModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (
      !selectedFile.name.endsWith(".xlsx") &&
      !selectedFile.name.endsWith(".xls")
    ) {
      toast.error("Định dạng file không hợp lệ", {
        description: "Vui lòng chọn file Excel (.xlsx, .xls)",
        position: "top-center",
      });
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn", {
        description: "Kích thước file không được vượt quá 5MB",
        position: "top-center",
      });
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setImporting(true);
    
    // Backend API mapping
    const formData = new FormData();
    formData.append("file", file);

    const success = await onImport(formData);
    
    setImporting(false);
    if (success) {
      handleRemoveFile();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!importing) {
          onClose();
          setTimeout(handleRemoveFile, 300);
        }
      }}
      title="Import Danh sách Khách mời"
    >
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-4">
          Tải lên tệp Excel (.xlsx, .xls) để thêm khách mời hàng loạt vào sự kiện.
        </p>

        {!file ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50/50 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="hidden"
              onChange={handleChange}
            />
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Nhấn để tải lên hoặc kéo thả file
            </p>
            <p className="text-xs text-gray-500">Hỗ trợ XLS, XLSX (Tối đa 5MB)</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              disabled={importing}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={importing}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || importing}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {importing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {importing ? "Đang xử lý..." : "Import dữ liệu"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
