import { Circle, Star } from "lucide-react";

import {
  getHolidayForDate,
  getMyanmarDateData,
  isSameDate,
} from "@/lib/calendar/date-utils";
import { cn } from "@/lib/utils";

export default function CalendarCell({
  cell,
  cellIndex,
  compact = false,
  today,
  selectedDate,
  onSelectDate,
  onFocusMonth,
  onOpenMonth,
  enableDetailModal = true,
  onOpenDetail,
  onClearDetail,
}) {
  const isWeekend = cellIndex % 7 === 0 || cellIndex % 7 === 6;
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
    <div className="group relative">
      {holiday && (
        <div className="font-myanmar pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 -translate-y-[105%] whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-xs font-semibold text-white shadow-md group-hover:block">
          {holiday.title}
        </div>
      )}

      <button
        type="button"
        onClick={(event) => {
          if (onOpenMonth) {
            event.stopPropagation();
          }

          if (isSelected && enableDetailModal) {
            onOpenDetail(cell.date);
            return;
          }

          onClearDetail();
          onSelectDate(cell.date);
          if (!cell.currentMonth && onFocusMonth) {
            onFocusMonth(
              new Date(cell.date.getFullYear(), cell.date.getMonth(), 1),
            );
          }
        }}
        className={cn(
          "relative w-full rounded-md border p-2 text-left transition sm:p-3",
          compact && "p-1.5 sm:p-2",
          compact ? "min-h-[84px]" : "min-h-[118px]",
          holiday && "border-rose-300 bg-rose-50/60",
          !holiday && "border-stone-200 bg-white",
          !cell.currentMonth && "bg-stone-100/80",
          isSelected && "border-[#0f766e] ring-1 ring-[#0f766e]/50",
          !isSelected && isToday && "border-[#0f766e] bg-teal-50/60",
          "hover:bg-stone-50",
        )}
      >
        <span
          className={cn(
            "font-myanmar absolute font-bold",
            compact ? "left-2 top-2 text-xs" : "left-3 top-3 text-sm",
            isWeekend && cell.currentMonth && "text-red-600",
            isWeekend && !cell.currentMonth && "text-red-400",
            !isWeekend && cell.currentMonth && "text-stone-600",
            !isWeekend && !cell.currentMonth && "text-stone-400",
          )}
        >
          {myanmarDate.dayNumberMy}
        </span>

        <div
          className={cn(
            "absolute flex items-center gap-1",
            compact ? "right-1.5 top-1.5" : "right-2 top-2",
          )}
        >
          {holiday && (
            <Star
              className={cn(
                "fill-rose-500 text-rose-500",
                compact ? "h-3 w-3" : "h-3.5 w-3.5",
              )}
            />
          )}
          {shouldShowEmphasis && (
            <Circle
              className={cn(compact ? "h-5 w-5" : "h-6 w-6", moonIconClass)}
            />
          )}
        </div>

        <span
          className={cn(
            "absolute grid -translate-y-1/2 place-items-center rounded-full font-bold leading-none",
            compact
              ? "right-1.5 top-[40%] h-8 w-8 text-xl"
              : "right-2 top-1/2 h-10 w-10 text-2xl",
            isSelected && "bg-[#0f766e] text-white",
            !isSelected && isToday && "border border-[#0f766e] text-[#0f766e]",
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
            "space-y-0.5",
            compact ? "mt-9" : "mt-12",
            !cell.currentMonth && "opacity-60",
          )}
        >
          <p
            className={cn(
              "font-myanmar font-semibold leading-tight text-stone-700",
              compact ? "text-[9px]" : "text-[10px]",
            )}
          >
            {myanmarDate.monthMy} {myanmarDate.dayPhaseMy}
          </p>
          <p
            title={holiday?.title}
            className={cn(
              "font-myanmar",
              compact
                ? "h-3 truncate text-[9px] font-bold"
                : "h-3 text-[10px] font-bold",
              holiday ? "text-rose-600" : "text-transparent",
            )}
          >
            {holiday?.title ?? ""}
          </p>
        </div>
      </button>
    </div>
  );
}
