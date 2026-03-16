import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { MONTH_NAMES } from "@/components/calendar/constants";
import { cn } from "@/lib/utils";

export default function CalendarToolbar({
  viewMode,
  focusedMonth,
  windowStart,
  yearOptions,
  monthYearOptions,
  rangeLabel,
  selectedDate,
  onJumpToToday,
  onShift,
  onFocusedMonthChange,
  onWindowStartChange,
  onSwitchToMonth,
  onSwitchToFourMonth,
}) {
  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onJumpToToday}
            className="rounded-full bg-[#b7702a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9f5f20]"
          >
            Today
          </button>

          <button
            type="button"
            onClick={() => onShift(-1)}
            aria-label={viewMode === "month" ? "Previous month" : "Previous four months"}
            className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:bg-stone-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onShift(1)}
            aria-label={viewMode === "month" ? "Next month" : "Next four months"}
            className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:bg-stone-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {viewMode === "month" ? (
            <label className="relative flex items-center">
              <CalendarDays className="pointer-events-none absolute left-3 h-4 w-4 text-stone-500" />
              <select
                value={`${focusedMonth.getFullYear()}-${focusedMonth.getMonth()}`}
                onChange={(event) => {
                  const [yearText, monthText] = event.target.value.split("-");
                  onFocusedMonthChange(new Date(Number(yearText), Number(monthText), 1));
                }}
                className="appearance-none rounded-full border border-stone-300 bg-white py-2 pl-9 pr-8 text-sm font-semibold text-stone-700 shadow-sm outline-none transition focus:border-[#b7702a]"
              >
                {monthYearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {MONTH_NAMES[option.month]} {option.year}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-stone-500" />
            </label>
          ) : (
            <label className="relative flex items-center">
              <CalendarDays className="pointer-events-none absolute left-3 h-4 w-4 text-stone-500" />
              <select
                value={windowStart.getFullYear()}
                onChange={(event) => {
                  onWindowStartChange(new Date(Number(event.target.value), windowStart.getMonth(), 1));
                }}
                className="appearance-none rounded-full border border-stone-300 bg-white py-2 pl-9 pr-8 text-sm font-semibold text-stone-700 shadow-sm outline-none transition focus:border-[#b7702a]"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-stone-500" />
            </label>
          )}
        </div>

        <div className="flex items-center rounded-full border border-stone-300 bg-stone-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onSwitchToMonth(selectedDate)}
            className={cn(
              "rounded-full px-4 py-1.5 transition",
              viewMode === "month" ? "bg-[#b7702a] text-white shadow-sm" : "text-stone-600",
            )}
          >
            Month
          </button>
          <button
            type="button"
            onClick={onSwitchToFourMonth}
            className={cn(
              "rounded-full px-4 py-1.5 transition",
              viewMode === "four" ? "bg-[#b7702a] text-white shadow-sm" : "text-stone-600",
            )}
          >
            4-Month
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-stone-500">Showing: {rangeLabel}</p>
    </div>
  );
}
