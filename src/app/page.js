"use client";

import { useMemo, useState } from "react";

import CalendarToolbar from "@/components/calendar/CalendarToolbar";
import DetailedMonthView from "@/components/calendar/DetailedMonthView";
import FourMonthGrid from "@/components/calendar/FourMonthGrid";
import HeaderBar from "@/components/calendar/HeaderBar";
import { MONTH_NAMES } from "@/lib/calendar/constants";
import {
  buildExpandedMonthCells,
  buildMonthCells,
  getFourMonthWindowStart,
  shiftMonthWindow,
} from "@/lib/calendar/date-utils";

export default function Home() {
  const today = useMemo(() => new Date(), []);

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [windowStart, setWindowStart] = useState(() => getFourMonthWindowStart(new Date()));
  const [focusedMonth, setFocusedMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [viewMode, setViewMode] = useState("four");

  const visibleMonths = useMemo(() => {
    return Array.from({ length: 4 }, (_, offset) => {
      const date = new Date(windowStart.getFullYear(), windowStart.getMonth() + offset, 1);

      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        name: MONTH_NAMES[date.getMonth()],
        cells: buildMonthCells(date.getFullYear(), date.getMonth()),
      };
    });
  }, [windowStart]);

  const rangeLabel = useMemo(() => {
    if (viewMode === "month") {
      return `${MONTH_NAMES[focusedMonth.getMonth()]} ${focusedMonth.getFullYear()}`;
    }

    const first = visibleMonths[0];
    const last = visibleMonths[visibleMonths.length - 1];
    return `${first.name} ${first.year} - ${last.name} ${last.year}`;
  }, [focusedMonth, viewMode, visibleMonths]);

  const detailedMonth = useMemo(() => {
    const year = focusedMonth.getFullYear();
    const month = focusedMonth.getMonth();

    return {
      year,
      month,
      name: MONTH_NAMES[month],
      cells: buildExpandedMonthCells(year, month),
    };
  }, [focusedMonth]);

  const yearOptions = useMemo(() => {
    const centerYear =
      viewMode === "month" ? focusedMonth.getFullYear() : windowStart.getFullYear();
    return Array.from({ length: 11 }, (_, idx) => centerYear - 5 + idx);
  }, [focusedMonth, viewMode, windowStart]);

  const jumpToToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setFocusedMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setViewMode("four");
    setWindowStart(getFourMonthWindowStart(now));
  };

  const handleShift = (delta) => {
    if (viewMode === "month") {
      setFocusedMonth((current) => shiftMonthWindow(current, delta));
      return;
    }

    setWindowStart((current) => shiftMonthWindow(current, delta * 4));
  };

  const handleYearChange = (nextDate) => {
    if (viewMode === "month") {
      setFocusedMonth(nextDate);
      return;
    }

    setWindowStart(nextDate);
  };

  const enterMonthView = (year, month) => {
    setFocusedMonth(new Date(year, month, 1));
    setViewMode("month");
  };

  const switchToMonthView = (date) => {
    setFocusedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setViewMode("month");
  };

  const switchToFourMonthView = () => {
    setViewMode("four");
    setWindowStart(getFourMonthWindowStart(focusedMonth));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#f9efe5_0%,#f3f0eb_45%,#ececeb_100%)] text-stone-800">
      <HeaderBar />

      <main className="mx-auto max-w-[1460px] px-3 py-3 md:px-6 lg:px-12 lg:py-4 xl:px-14">
        <section className="space-y-5">
          <CalendarToolbar
            viewMode={viewMode}
            focusedMonth={focusedMonth}
            windowStart={windowStart}
            yearOptions={yearOptions}
            rangeLabel={rangeLabel}
            selectedDate={selectedDate}
            onJumpToToday={jumpToToday}
            onShift={handleShift}
            onWindowStartChange={handleYearChange}
            onSwitchToMonth={switchToMonthView}
            onSwitchToFourMonth={switchToFourMonthView}
          />

          {viewMode === "month" ? (
            <DetailedMonthView
              detailedMonth={detailedMonth}
              today={today}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onFocusMonth={setFocusedMonth}
            />
          ) : (
            <FourMonthGrid
              visibleMonths={visibleMonths}
              today={today}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onEnterMonthView={enterMonthView}
            />
          )}
        </section>
      </main>
    </div>
  );
}
