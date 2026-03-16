import { WEEKDAY_LABELS } from "@/lib/calendar/constants";
import { getHolidayForDate, getMyanmarDateData, isSameDate } from "@/lib/calendar/date-utils";
import { cn } from "@/lib/utils";

export default function FourMonthGrid({
  visibleMonths,
  today,
  selectedDate,
  onSelectDate,
  onEnterMonthView,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {visibleMonths.map((month) => (
        <article
          key={`${month.year}-${month.month}`}
          onClick={() => onEnterMonthView(month.year, month.month)}
          className="cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-end justify-between border-b border-stone-200 pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-stone-800">{month.name}</h2>
            <span className="text-sm font-semibold text-stone-500">{month.year}</span>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-y-2 text-[11px] font-bold uppercase tracking-wide text-stone-500">
            {WEEKDAY_LABELS.map((label, index) => (
              <span
                key={`${month.name}-${label}`}
                className={cn(index === 0 || index === 6 ? "text-red-600" : "text-stone-500")}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {month.cells.map((day, index) => {
              if (!day) {
                return <div key={`${month.name}-blank-${index}`} className="h-[72px] rounded-md" />;
              }

              const thisDate = new Date(month.year, month.month, day);
              const isWeekend = index % 7 === 0 || index % 7 === 6;
              const isToday = isSameDate(thisDate, today);
              const isSelected = isSameDate(thisDate, selectedDate);
              const holiday = getHolidayForDate(thisDate);
              const myanmarDate = getMyanmarDateData(thisDate);
              const hasHoliday = Boolean(holiday);

              return (
                <div key={`${month.year}-${month.month}-${day}`} className="relative group">
                  {hasHoliday && (
                    <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 -translate-y-[105%] whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-xs font-semibold text-white shadow-md group-hover:block">
                      {holiday.title}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectDate(thisDate);
                    }}
                    className={cn(
                      "relative h-[72px] w-full rounded-md border p-1.5 text-left transition",
                      hasHoliday && "border-rose-300 bg-rose-50/70",
                      !hasHoliday && "border-stone-200 bg-white",
                      isSelected && "border-[#b7702a] ring-1 ring-[#b7702a]/50",
                      !isSelected && isToday && "border-[#b7702a] bg-amber-50/60",
                      "hover:bg-stone-50",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          hasHoliday && "text-rose-700",
                          !hasHoliday && isWeekend && "text-red-600",
                          !hasHoliday && !isWeekend && "text-stone-700",
                        )}
                      >
                        {day}
                      </span>
                      {hasHoliday && (
                        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
                          HOLIDAY
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-[10px] font-semibold text-stone-500">
                      {myanmarDate.monthMy}
                    </p>
                    <p className="truncate text-[10px] font-semibold text-stone-700">
                      {myanmarDate.dayPhaseMy}{" "}
                      <span className={cn(isWeekend && "text-red-600")}>
                        {myanmarDate.dayNumberMy}
                      </span>
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
