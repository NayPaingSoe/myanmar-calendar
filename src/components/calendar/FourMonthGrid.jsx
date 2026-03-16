import DetailedMonthView from "@/components/calendar/DetailedMonthView";

export default function FourMonthGrid({
  visibleMonths,
  today,
  selectedDate,
  onSelectDate,
  onEnterMonthView,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {visibleMonths.map((month) => (
        <DetailedMonthView
          key={`${month.year}-${month.month}`}
          detailedMonth={month}
          today={today}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          compact
          onOpenMonth={() => onEnterMonthView(month.year, month.month)}
        />
      ))}
    </div>
  );
}
