import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type DateTimePickerProps = {
  value?: Date | string | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minYear?: number;
  maxYear?: number;
};

const DateTimePicker = ({
  value,
  onChange,
  placeholder = "Chọn ngày",
  className = "",
  disabled = false,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setCurrentDate(date);
    }
  }, [value]);

  // Lấy các ngày trong tháng
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(date);
    // Đặt giờ về 00:00:00 để chỉ lấy ngày
    newDate.setHours(0, 0, 0, 0);

    onChange && onChange(newDate);
    setIsOpen(false);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const generateYears = () => {
    const years = [];
    for (let year = minYear; year <= maxYear; year++) {
      years.push(year);
    }
    return years;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return date.toDateString() === selectedDate.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getDaysInMonth(currentDate);
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return (
    <div className={`relative h-[52px]  ${className}`} ref={dropdownRef}>
      {/* Input Field */}
      <div
        className={` h-[52px]
          flex items-center justify-between px-3 py-2 border  border-[#b8b8b8]  rounded-lg 
          bg-white cursor-pointer transition-colors duration-200
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          }
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900" : "text-[#999] text-sm"}>
          {value ? formatDate(new Date(value)) : placeholder}
        </span>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200  rounded-lg  shadow-lg z-50 min-w-80">
          {/* Date Picker */}
          <div className="p-4">
            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => navigateMonth(-1)}
                disabled={showYearPicker || showMonthPicker}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2">
                {/* Month Selector */}
                <button
                  className="text-lg font-semibold hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={() => {
                    setShowMonthPicker(!showMonthPicker);
                    setShowYearPicker(false);
                  }}
                >
                  {months[currentDate.getMonth()]}
                </button>

                {/* Year Selector */}
                <button
                  className="text-lg font-semibold hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={() => {
                    setShowYearPicker(!showYearPicker);
                    setShowMonthPicker(false);
                  }}
                >
                  {currentDate.getFullYear()}
                </button>
              </div>

              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => navigateMonth(1)}
                disabled={showYearPicker || showMonthPicker}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Year Picker */}
            {showYearPicker && (
              <div className="mb-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-4 gap-1 p-2">
                  {generateYears().map((year) => (
                    <button
                      key={year}
                      className={`
                        px-3 py-2 text-sm rounded transition-colors
                        ${
                          year === currentDate.getFullYear()
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }
                      `}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Month Picker */}
            {showMonthPicker && (
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-1">
                  {months.map((month, index) => (
                    <button
                      key={index}
                      className={`
                        px-3 py-2 text-sm rounded transition-colors
                        ${
                          index === currentDate.getMonth()
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }
                      `}
                      onClick={() => handleMonthSelect(index)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar Grid - Chỉ hiển thị khi không chọn năm/tháng */}
            {!showYearPicker && !showMonthPicker && (
              <>
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <button
                      key={index}
                      className={`
                        w-8 h-8 text-sm rounded transition-colors
                        ${
                          !isCurrentMonth(day)
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                        ${
                          isToday(day)
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : ""
                        }
                        ${
                          isSelected(day)
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }
                      `}
                      onClick={() => handleDateSelect(day)}
                    >
                      {day.getDate()}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default DateTimePicker;

