import { HOLIDAY_TEMPLATES } from "@/lib/calendar/constants";
import { Mycal } from "mycal";

export function buildMonthCells(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array(firstWeekday).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function buildExpandedMonthCells(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    const day = daysInPreviousMonth - i;
    const date = new Date(year, month - 1, day);
    cells.push({ day, date, currentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ day, date, currentMonth: true });
  }

  let nextMonthDay = 1;
  while (cells.length < 42) {
    const date = new Date(year, month + 1, nextMonthDay);
    cells.push({ day: nextMonthDay, date, currentMonth: false });
    nextMonthDay += 1;
  }

  return cells;
}

export function getFourMonthWindowStart(date) {
  const monthWindowStart = Math.floor(date.getMonth() / 4) * 4;
  return new Date(date.getFullYear(), monthWindowStart, 1);
}

export function shiftMonthWindow(date, deltaMonths) {
  return new Date(date.getFullYear(), date.getMonth() + deltaMonths, 1);
}

export function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getHolidayForDate(date) {
  return HOLIDAY_TEMPLATES.find(
    (holiday) => holiday.month === date.getMonth() && holiday.day === date.getDate(),
  );
}

export function getMyanmarDateData(date) {
  const myanmarDate = new Mycal(date);

  return {
    yearMy: myanmarDate.year.my,
    monthMy: myanmarDate.month.my,
    dayPhaseMy: myanmarDate.day.mp.my,
    dayPhaseEn: myanmarDate.day.mp.en,
    dayNumberMy: myanmarDate.day.fd.my,
  };
}

export function getMyanmarMonthYearRangeForWesternMonth(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [];
  const yearNames = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const myanmarDate = new Mycal(new Date(year, month, day));
    const currentMonthName = myanmarDate.month.my;
    const currentYearName = myanmarDate.year.my;

    if (monthNames[monthNames.length - 1] !== currentMonthName) {
      monthNames.push(currentMonthName);
    }

    if (yearNames[yearNames.length - 1] !== currentYearName) {
      yearNames.push(currentYearName);
    }
  }

  return {
    monthRangeMy: monthNames.join("-"),
    yearRangeMy: yearNames.join("-"),
  };
}
