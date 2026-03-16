import { Star } from "lucide-react";

import { WEEKDAY_LABELS } from "@/components/calendar/constants";
import { getHolidayForDate, getMyanmarDateData, isSameDate } from "@/components/calendar/date-utils";
import { cn } from "@/lib/utils";

export default function DetailedMonthView({
  detailedMonth,
  today,
  selectedDate,
  onSelectDate,
  onFocusMonth,
}) {
  const monthHeaderMyanmar = getMyanmarDateData(new Date(detailedMonth.year, detailedMonth.month, 1));

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
      <div className="border-b border-stone-200 bg-stone-50 px-4 py-3">
        <h2 className="text-2xl font-bold tracking-tight text-stone-800">
          {detailedMonth.name} {detailedMonth.year}
        </h2>
        <p className="mt-1 text-sm font-semibold text-[#8a4f1b]">
          {monthHeaderMyanmar.monthMy} {monthHeaderMyanmar.yearMy}
        </p>
      </div>

      <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-100">
        {WEEKDAY_LABELS.map((label, index) => (
          <div
            key={`month-weekday-${label}`}
            className={cn(
              "px-2 py-2 text-center text-xs font-bold tracking-wide text-stone-600",
              index === 0 || index === 6 ? "text-rose-600" : "text-stone-600",
            )}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {detailedMonth.cells.map((cell, index) => {
          const isWeekend = index % 7 === 0 || index % 7 === 6;
          const isToday = isSameDate(cell.date, today);
          const isSelected = isSameDate(cell.date, selectedDate);
          const holiday = getHolidayForDate(cell.date);
          const myanmarDate = getMyanmarDateData(cell.date);
          const shouldShowEmphasis =
            myanmarDate.dayPhaseEn === "Full Moon" || myanmarDate.dayPhaseEn === "New Moon";

          return (
            <button
              key={`${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`}
              type="button"
              onClick={() => {
                onSelectDate(cell.date);
                if (!cell.currentMonth) {
                  onFocusMonth(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
                }
              }}
              className={cn(
                "relative flex min-h-[118px] flex-col border-b border-stone-200 p-2 text-left transition sm:p-3",
                (index + 1) % 7 !== 0 && "border-r border-stone-200",
                cell.currentMonth ? "bg-white" : "bg-stone-100/80",
                cell.currentMonth && holiday && "bg-rose-50/60",
                isSelected && "bg-amber-50/80",
                "hover:bg-stone-50",
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-xl font-bold leading-none",
                    isSelected && "bg-[#b7702a] text-white",
                    !isSelected && isToday && "border border-[#b7702a] text-[#9f5f20]",
                    !isSelected && !isToday && isWeekend && "text-rose-600",
                    !isSelected && !isToday && cell.currentMonth && "text-stone-800",
                    !cell.currentMonth && "text-stone-400",
                  )}
                >
                  {cell.day}
                </span>

                <div className="flex items-center gap-1">
                  {holiday && <Star className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />}
                  {shouldShowEmphasis && (
                    <span className="h-3 w-3 rounded-full bg-amber-400 ring-1 ring-amber-600/20" />
                  )}
                </div>
              </div>

              <div className={cn("mt-2 space-y-0.5", !cell.currentMonth && "opacity-60")}>
                <p className="text-[11px] font-semibold text-stone-500">
                  {myanmarDate.monthMy} {myanmarDate.yearMy}
                </p>
                <p
                  className={cn(
                    "text-sm font-bold",
                    shouldShowEmphasis ? "text-[#7b4516]" : "text-stone-700",
                  )}
                >
                  {myanmarDate.dayPhaseMy} {myanmarDate.dayNumberMy}
                </p>
                {holiday && <p className="text-[11px] font-bold text-rose-600">{holiday.title}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </article>
  );
}
