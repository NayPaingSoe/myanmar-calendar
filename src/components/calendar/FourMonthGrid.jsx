import { WEEKDAY_LABELS } from "@/components/calendar/constants";
import { getHolidayForDate, isSameDate } from "@/components/calendar/date-utils";
import { cn } from "@/lib/utils";

export default function FourMonthGrid({
  visibleMonths,
  today,
  selectedDate,
  onSelectDate,
  onEnterMonthView,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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
                className={cn(index === 0 || index === 6 ? "text-rose-500" : "text-stone-500")}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-y-2">
            {month.cells.map((day, index) => {
              if (!day) {
                return <span key={`${month.name}-blank-${index}`} className="h-8 w-8" />;
              }

              const thisDate = new Date(month.year, month.month, day);
              const isWeekend = index % 7 === 0 || index % 7 === 6;
              const isToday = isSameDate(thisDate, today);
              const isSelected = isSameDate(thisDate, selectedDate);
              const hasHoliday = Boolean(getHolidayForDate(thisDate));

              return (
                <button
                  key={`${month.year}-${month.month}-${day}`}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectDate(thisDate);
                  }}
                  className={cn(
                    "relative grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition",
                    isSelected && "bg-[#b7702a] text-white shadow-md shadow-[#b7702a]/35",
                    !isSelected && isToday && "border border-[#b7702a] bg-amber-50 text-[#9f5f20]",
                    !isSelected && !isToday && isWeekend && "text-rose-500",
                    !isSelected && !isToday && !isWeekend && "text-stone-700",
                    !isSelected && "hover:bg-stone-100",
                  )}
                >
                  <span>{day}</span>
                  {hasHoliday && !isSelected && (
                    <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-rose-500" />
                  )}
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
