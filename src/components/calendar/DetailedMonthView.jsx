import { useMemo, useRef, useState } from "react";

import { Circle, Star } from "lucide-react";

import { WEEKDAY_LABELS } from "@/lib/calendar/constants";
import {
  getHolidayForDate,
  getMyanmarDateData,
  getMyanmarMonthYearRangeForWesternMonth,
  isSameDate,
} from "@/lib/calendar/date-utils";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [detailDate, setDetailDate] = useState(null);
  const suppressOpenMonthUntilRef = useRef(0);

  const monthHeaderMyanmar = getMyanmarMonthYearRangeForWesternMonth(
    detailedMonth.year,
    detailedMonth.month,
  );
  const detailMyanmarDate = useMemo(
    () => (detailDate ? getMyanmarDateData(detailDate) : null),
    [detailDate],
  );
  const detailHoliday = useMemo(
    () => (detailDate ? getHolidayForDate(detailDate) : null),
    [detailDate],
  );
  const detailWesternDate = useMemo(
    () =>
      detailDate
        ? detailDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
    [detailDate],
  );
  const handleOpenMonth = (event) => {
    if (!onOpenMonth) {
      return;
    }

    if (Date.now() < suppressOpenMonthUntilRef.current) {
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
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-stone-200 pb-3">
        <h2
          className={cn(
            "font-bold tracking-tight text-stone-800",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          {detailedMonth.name} {detailedMonth.year}
        </h2>
        <p className={cn("font-semibold text-[#8a4f1b]", compact ? "text-xs" : "text-sm")}>
          {monthHeaderMyanmar.monthRangeMy} {monthHeaderMyanmar.yearRangeMy}
        </p>
      </div>

      <div
        className={cn(
          "mt-3 grid grid-cols-7 gap-y-2 font-bold uppercase tracking-wide text-stone-500",
          compact ? "text-[10px]" : "text-[11px]",
        )}
      >
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
                onClick={(event) => {
                  if (onOpenMonth) {
                    event.stopPropagation();
                  }

                  if (isSelected && enableDetailModal) {
                    setDetailDate(cell.date);
                    return;
                  }

                  setDetailDate(null);
                  onSelectDate(cell.date);
                  if (!cell.currentMonth && onFocusMonth) {
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
                  "relative w-full rounded-md border p-2 text-left transition sm:p-3",
                  compact && "p-1.5 sm:p-2",
                  compact ? "min-h-[84px]" : "min-h-[118px]",
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
                    "absolute font-bold",
                    compact ? "left-2 top-2 text-xs" : "left-3 top-3 text-sm",
                    isWeekend && cell.currentMonth && "text-red-600",
                    isWeekend && !cell.currentMonth && "text-red-400",
                    !isWeekend && cell.currentMonth && "text-stone-600",
                    !isWeekend && !cell.currentMonth && "text-stone-400",
                  )}
                >
                  {myanmarDate.dayNumberMy}
                </span>

                <div className={cn("absolute flex items-center gap-1", compact ? "right-1.5 top-1.5" : "right-2 top-2")}>
                  {holiday && (
                    <Star
                      className={cn(
                        "fill-rose-500 text-rose-500",
                        compact ? "h-3 w-3" : "h-3.5 w-3.5",
                      )}
                    />
                  )}
                  {shouldShowEmphasis && (
                    <Circle className={cn(compact ? "h-5 w-5" : "h-6 w-6", moonIconClass)} />
                  )}
                </div>

                <span
                  className={cn(
                    "absolute top-1/2 grid -translate-y-1/2 place-items-center rounded-full font-bold leading-none",
                    compact ? "right-1.5 h-7 w-7 text-lg" : "right-2 h-8 w-8 text-xl",
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
                    "space-y-0.5",
                    compact ? "mt-9" : "mt-12",
                    !cell.currentMonth && "opacity-60",
                  )}
                >
                  <p
                    className={cn(
                      "font-semibold leading-tight text-stone-500",
                      compact ? "text-[9px]" : "text-[10px]",
                    )}
                  >
                    {myanmarDate.monthMy} {myanmarDate.dayPhaseMy}
                  </p>
                  <p
                    title={holiday?.title}
                    className={cn(
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
        })}
      </div>

      <Dialog
        open={Boolean(enableDetailModal && detailDate && detailMyanmarDate)}
        onOpenChange={(open) => {
          if (!open) {
            setDetailDate(null);
            suppressOpenMonthUntilRef.current = Date.now() + 280;
          }
        }}
      >
        <DialogContent className="max-w-md overflow-hidden p-0" showClose={false}>
          <div className="border-b border-stone-200 bg-[linear-gradient(180deg,#fff8ef_0%,#fff_100%)] px-5 py-4">
            <DialogHeader className="gap-1">
              <DialogTitle className="text-lg">Date Detail</DialogTitle>
              <DialogDescription className="font-semibold text-[#8a4f1b]">
                {detailWesternDate}
              </DialogDescription>
            </DialogHeader>
          </div>

          {detailMyanmarDate && (
            <div className="space-y-3 p-5">
              <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Myanmar Year
                </p>
                <p className="mt-1 text-base font-bold text-stone-800">
                  {detailMyanmarDate.yearMy}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Myanmar Date
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-800">
                  {detailMyanmarDate.monthMy} {detailMyanmarDate.dayPhaseMy}{" "}
                  {detailMyanmarDate.dayNumberMy}
                </p>
              </div>

              <div
                className={cn(
                  "rounded-xl border px-3 py-2",
                  detailHoliday
                    ? "border-rose-200 bg-rose-50/70"
                    : "border-stone-200 bg-stone-50/80",
                )}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                  Holiday
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm font-semibold",
                    detailHoliday ? "text-rose-700" : "text-stone-700",
                  )}
                >
                  {detailHoliday?.title ?? "No holiday"}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end border-t border-stone-200 bg-stone-50/70 px-5 py-3">
            <DialogClose className="h-9 w-auto rounded-lg bg-[#b7702a] px-4 text-sm font-semibold text-white hover:bg-[#9f5f20] hover:text-white">
              Close
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
