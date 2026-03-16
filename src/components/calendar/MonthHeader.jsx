import { WEEKDAY_LABELS } from "@/lib/calendar/constants";
import { cn } from "@/lib/utils";

export default function MonthHeader({ title, subtitle, compact = false }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-stone-200 pb-3">
        <h2
          className={cn(
            "font-bold tracking-tight text-stone-800",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          {title}
        </h2>
        <p className={cn("font-semibold text-[#0f766e]", compact ? "text-xs" : "text-sm")}>
          {subtitle}
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
    </>
  );
}
