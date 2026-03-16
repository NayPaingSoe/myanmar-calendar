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
    <article className="rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-stone-200 pb-3">
        <h2 className="text-2xl font-bold tracking-tight text-stone-800">
          {detailedMonth.name} {detailedMonth.year}
        </h2>
        <p className="text-sm font-semibold text-[#8a4f1b]">
          {monthHeaderMyanmar.monthRangeMy} {monthHeaderMyanmar.yearRangeMy}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-2 text-[11px] font-bold uppercase tracking-wide text-stone-500">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={`month-weekday-${label}`}
            className={cn(
              "text-center",
              index === 0 || index === 6 ? "text-red-600" : "text-stone-500",
            )}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {detailedMonth.cells.map((cell, index) => {
          const isWeekend = index % 7 === 0 || index % 7 === 6;
          const isToday = isSameDate(cell.date, today);
          const isSelected = isSameDate(cell.date, selectedDate);
          const holiday = getHolidayForDate(cell.date);
          const myanmarDate = getMyanmarDateData(cell.date);
          const isMyanmarNewMoon = myanmarDate.dayPhaseEn === "New Moon";
          const moonIconClass = isMyanmarNewMoon
            ? "fill-zinc-400 text-zinc-400"
            : myanmarDate.dayPhaseEn === "Full Moon"
              ? "fill-amber-400 text-amber-400"
              : null;
          const shouldShowEmphasis = Boolean(moonIconClass);

          return (
            <div
              key={`${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`}
              className="group relative"
            >
              {holiday && (
                <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 -translate-y-[105%] whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-xs font-semibold text-white shadow-md group-hover:block">
                  {holiday.title}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  onSelectDate(cell.date);
                  if (!cell.currentMonth) {
                    onFocusMonth(
                      new Date(
                        cell.date.getFullYear(),
                        cell.date.getMonth(),
                        1,
                      ),
                    );
                  }
                }}
                className={cn(
                  "relative min-h-[118px] w-full rounded-md border p-2 text-left transition sm:p-3",
                  holiday && "border-rose-300 bg-rose-50/60",
                  !holiday && "border-stone-200 bg-white",
                  !cell.currentMonth && "bg-stone-100/80",
                  isSelected && "border-[#b7702a] ring-1 ring-[#b7702a]/50",
                  !isSelected && isToday && "border-[#b7702a] bg-amber-50/60",
                  "hover:bg-stone-50",
                )}
              >
                <span
                  className={cn(
                    "absolute left-3 top-3 text-sm font-bold",
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
                    <Circle className={cn("h-6 w-6", moonIconClass)} />
                  )}
                </div>

                <span
                  className={cn(
                    "absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-xl font-bold leading-none",
                    isSelected && "bg-[#b7702a] text-white",
                    !isSelected &&
                      isToday &&
                      "border border-[#b7702a] text-[#9f5f20]",
                    !isSelected && !isToday && isWeekend && "text-red-600",
                    !isSelected &&
                      !isToday &&
                      !isWeekend &&
                      cell.currentMonth &&
                      "text-stone-800",
                    !isSelected &&
                      !isToday &&
                      !isWeekend &&
                      !cell.currentMonth &&
                      "text-stone-400",
                  )}
                >
                  {cell.day}
                </span>

                <div
                  className={cn(
                    "mt-14 max-w-[calc(100%-2.5rem)] space-y-0.5",
                    !cell.currentMonth && "opacity-60",
                  )}
                >
                  <p className="truncate text-[10px] font-semibold text-stone-500">
                    {myanmarDate.monthMy}
                    {myanmarDate.dayPhaseMy}
                  </p>
                  <p
                    className={cn(
                      "truncate text-[11px] font-bold",
                      shouldShowEmphasis ? "text-[#7b4516]" : "text-stone-700",
                    )}
                  ></p>
                  {holiday && (
                    <p className="truncate text-[10px] font-bold text-rose-600">
                      {holiday.title}
                    </p>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
}
