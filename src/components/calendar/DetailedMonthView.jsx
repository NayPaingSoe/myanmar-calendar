import { useMemo } from "react";

import CalendarCell from "@/components/calendar/CalendarCell";
import { cn } from "@/lib/utils";
import DateDetailModal from "@/components/calendar/DateDetailModal";
import MonthHeader from "@/components/calendar/MonthHeader";
import { getMyanmarMonthYearRangeForWesternMonth } from "@/lib/calendar/date-utils";
import useDateDetailModal from "@/hooks/useDateDetailModal";

export default function DetailedMonthView({
  detailedMonth,
  today,
  selectedDate,
  onSelectDate,
  onFocusMonth,
  compact = false,
  onOpenMonth,
  enableDetailModal = true,
}) {
  const monthHeaderMyanmar = useMemo(
    () => getMyanmarMonthYearRangeForWesternMonth(detailedMonth.year, detailedMonth.month),
    [detailedMonth.month, detailedMonth.year],
  );
  const {
    detailHoliday,
    detailMyanmarDate,
    detailWesternDate,
    isDetailModalOpen,
    openDetailForDate,
    clearDetail,
    shouldSuppressOpenMonth,
    handleModalOpenChange,
  } = useDateDetailModal(enableDetailModal);

  const monthTitle = `${detailedMonth.name} ${detailedMonth.year}`;
  const myanmarSubtitle = `${monthHeaderMyanmar.monthRangeMy} ${monthHeaderMyanmar.yearRangeMy}`;

  const handleOpenMonth = (event) => {
    if (!onOpenMonth) {
      return;
    }

    if (shouldSuppressOpenMonth()) {
      event.stopPropagation();
      return;
    }

    onOpenMonth();
  };

  return (
    <article
      onClick={handleOpenMonth}
      className={cn(
        "rounded-2xl border border-stone-200 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]",
        compact ? "p-3" : "p-4",
        onOpenMonth &&
          "cursor-pointer transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(0,0,0,0.4)]",
      )}
    >
      <MonthHeader
        title={monthTitle}
        subtitle={myanmarSubtitle}
        compact={compact}
        subtitleClassName="font-myanmar"
      />

      <div className="mt-2 grid grid-cols-7 gap-1">
        {detailedMonth.cells.map((cell, index) => (
          <CalendarCell
            key={`${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`}
            cell={cell}
            cellIndex={index}
            compact={compact}
            today={today}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            onFocusMonth={onFocusMonth}
            onOpenMonth={onOpenMonth}
            enableDetailModal={enableDetailModal}
            onOpenDetail={openDetailForDate}
            onClearDetail={clearDetail}
          />
        ))}
      </div>

      <DateDetailModal
        open={isDetailModalOpen}
        onOpenChange={handleModalOpenChange}
        westernDate={detailWesternDate}
        myanmarDate={detailMyanmarDate}
        holiday={detailHoliday}
      />
    </article>
  );
}
