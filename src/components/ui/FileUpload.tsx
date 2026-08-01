// FileUpload.tsx
"use client";
import { i18nText } from "@/lib/i18nText";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean; // vẫn để đây cho tái sử dụng, nhưng khi dùng sẽ set false
  error?: any;
  helperText?: string;
  onChange: (files: FileList | null) => void;
  value?: FileList | null; // <-- thêm
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = "*/*",
  multiple = false,
  error,
  helperText,
  onChange,
  value = null, // <-- mặc định null
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Đồng bộ từ value (controlled)
  useEffect(() => {
    if (value && value.length > 0) {
      setSelectedFiles(Array.from(value));
    } else {
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [value]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) {
        setSelectedFiles([]);
        onChange(null);
        return;
      }

      let arr = Array.from(files);
      if (!multiple && arr.length > 1) arr = [arr[0]]; // ép 1 file

      // Cập nhật UI
      setSelectedFiles(arr);

      // Đưa giá trị chuẩn về RHF
      if (arr.length === 0) {
        onChange(null);
      } else {
        const dt = new DataTransfer();
        arr.forEach((f) => dt.items.add(f));
        onChange(dt.files);
      }
    },
    [onChange, multiple]
  );

  const handleClick = () => {
    if (!disabled && fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (newFiles.length === 0) {
      onChange(null);
    } else {
      const dt = new DataTransfer();
      newFiles.forEach((f) => dt.items.add(f));
      onChange(dt.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type;
    if (fileType.startsWith("image/"))
      return <ImageIcon className="w-4 h-4 text-blue-500" />;
    if (
      fileType === "application/pdf" ||
      fileType.includes("document") ||
      fileType.includes("word")
    )
      return <FileText className="w-4 h-4 text-red-500" />;
    return <File className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="space-y-2">
          <Upload
            className={`mx-auto h-8 w-8 ${
              isDragOver ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <div>
            <p className="text-sm text-gray-600">
              {isDragOver ? (
                i18nText("AUTO.components.ui.fileupload.line189_0_tha_file_vao_day")
              ) : (
                <>
                  <span className="font-medium text-blue-600 hover:text-blue-500">{i18nText("AUTO.components.ui.fileupload.line193_1_nhap_chon_file")}</span>{" "}{i18nText("AUTO.components.ui.fileupload.line195_2_hoac_keo_tha_vao_day")}</>
              )}
            </p>
            {helperText && (
              <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">{i18nText("AUTO.components.ui.fileupload.line210_3_file_da_chon")}{selectedFiles.length})
            </h4>
            {selectedFiles.length > 1 && (
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >{i18nText("AUTO.components.ui.fileupload.line218_4_xoa_tat_ca")}</button>
            )}
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title={i18nText("AUTO.components.ui.fileupload.line244_5_xoa_file")}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;

