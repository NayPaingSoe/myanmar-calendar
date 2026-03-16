import { Circle, Star } from "lucide-react";

import { WEEKDAY_LABELS } from "@/lib/calendar/constants";
import {
  getHolidayForDate,
  getMyanmarDateData,
  getMyanmarMonthYearRangeForWesternMonth,
  isSameDate,
} from "@/lib/calendar/date-utils";
import { cn } from "@/lib/utils";

export default function DetailedMonthView({
  detailedMonth,
  today,
  selectedDate,
  onSelectDate,
  onFocusMonth,
}) {
  const monthHeaderMyanmar = getMyanmarMonthYearRangeForWesternMonth(
    detailedMonth.year,
    detailedMonth.month,
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
      <div className="border-b border-stone-200 bg-stone-50 px-4 py-3">
        <h2 className="text-2xl font-bold tracking-tight text-stone-800">
          {detailedMonth.name} {detailedMonth.year}
          <span className="ml-2 text-lg font-semibold text-[#8a4f1b]">
            {monthHeaderMyanmar.monthRangeMy} {monthHeaderMyanmar.yearRangeMy}
          </span>
        </h2>
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
          const dayPhaseMy = myanmarDate.dayPhaseMy.trim();
          const isMyanmarNewMoon = dayPhaseMy.includes("ကွယ်");
          const isWaningAfterFullMoon = dayPhaseMy.includes("ကျော်");
          const isMyanmarFullMoon =
            !isWaningAfterFullMoon &&
            (dayPhaseMy.includes("ပြည့်") || dayPhaseMy.includes("ပြည့္"));
          const moonIconClass = isMyanmarNewMoon
            ? "fill-zinc-400 text-zinc-400"
            : isMyanmarFullMoon || myanmarDate.dayPhaseEn === "Full Moon"
              ? "fill-amber-400 text-amber-400"
              : null;
          const shouldShowEmphasis = Boolean(moonIconClass);

          return (
            <button
              key={`${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`}
              type="button"
              onClick={() => {
                onSelectDate(cell.date);
                if (!cell.currentMonth) {
                  onFocusMonth(
                    new Date(cell.date.getFullYear(), cell.date.getMonth(), 1),
                  );
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
              <span
                className={cn(
                  "absolute left-4 top-4 text-sm font-bold",
                  cell.currentMonth ? "text-stone-600" : "text-stone-400",
                )}
              >
                {myanmarDate.dayNumberMy}
              </span>

              <div className="absolute right-2 top-2 flex items-center gap-1">
                {holiday && (
                  <Star className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                )}
                {shouldShowEmphasis && (
                  <Circle className={cn("h-5 w-5", moonIconClass)} />
                )}
              </div>

              <span
                className={cn(
                  "absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-xl font-bold leading-none",
                  isSelected && "bg-[#b7702a] text-white",
                  !isSelected &&
                    isToday &&
                    "border border-[#b7702a] text-[#9f5f20]",
                  !isSelected && !isToday && isWeekend && "text-rose-600",
                  !isSelected &&
                    !isToday &&
                    cell.currentMonth &&
                    "text-stone-800",
                  !cell.currentMonth && "text-stone-400",
                )}
              >
                {cell.day}
              </span>

              <div
                className={cn(
                  "mt-14 space-y-0.5 pr-10",
                  !cell.currentMonth && "opacity-60",
                )}
              >
                <p className="text-[11px] font-semibold text-stone-500">
                  {myanmarDate.monthMy}
                </p>
                <p
                  className={cn(
                    "text-sm font-bold",
                    shouldShowEmphasis ? "text-[#7b4516]" : "text-stone-700",
                  )}
                >
                  {myanmarDate.dayPhaseMy}
                </p>
              </div>
              {holiday && (
                <p className="text-[11px] font-bold text-rose-600">
                  {holiday.title}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </article>
  );
}
