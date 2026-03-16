import { ceDateTime, ceMmDateTime, ceMmTranslate } from "@/lib/calendar/mmcal/ceMmDateTime";

const MM_TRANSLATOR = new ceMmTranslate();
const MYANMAR_LANGUAGE = 1;
const ENGLISH_LANGUAGE = 0;

const MYANMAR_MONTHS_EN = [
  "First Waso",
  "Tagu",
  "Kason",
  "Nayon",
  "Waso",
  "Wagaung",
  "Tawthalin",
  "Thadingyut",
  "Tazaungmon",
  "Nadaw",
  "Pyatho",
  "Tabodwe",
  "Tabaung",
  "Late Tagu",
  "Late Kason",
];

const MOON_PHASES_EN = ["Waxing", "Full Moon", "Waning", "New Moon"];

function translateToMyanmar(value) {
  if (value == null || value === "") {
    return "";
  }

  return MM_TRANSLATOR.T(String(value), MYANMAR_LANGUAGE, ENGLISH_LANGUAGE);
}

function getMyanmarMonthNameEn(mmDate) {
  const monthName = MYANMAR_MONTHS_EN[mmDate.mm] ?? "";

  if (mmDate.mm === 4 && mmDate.myt > 0) {
    return `Second ${monthName}`;
  }

  return monthName;
}

function getMmDateTimeForWesternDate(date) {
  const jd = ceDateTime.w2j(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    12,
    0,
    0,
    1,
  );

  return new ceMmDateTime(jd, 0, 1);
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
  const mmDate = getMmDateTimeForWesternDate(date);
  const publicHolidays = mmDate.holidays;

  if (!publicHolidays.length) {
    return null;
  }

  return {
    title: publicHolidays.map((holiday) => translateToMyanmar(holiday)).join("၊ "),
    titleEn: publicHolidays.join(", "),
  };
}

export function getMyanmarDateData(date) {
  const mmDate = getMmDateTimeForWesternDate(date);
  const dayPhaseEn = MOON_PHASES_EN[mmDate.mp] ?? "";

  return {
    yearMy: translateToMyanmar(mmDate.my),
    monthMy: translateToMyanmar(getMyanmarMonthNameEn(mmDate)),
    dayPhaseMy: translateToMyanmar(dayPhaseEn),
    dayPhaseEn,
    dayNumberMy: translateToMyanmar(mmDate.mf),
  };
}

export function getMyanmarMonthYearRangeForWesternMonth(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [];
  const yearNames = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const mmDate = getMmDateTimeForWesternDate(new Date(year, month, day));
    const currentMonthName = translateToMyanmar(getMyanmarMonthNameEn(mmDate));
    const currentYearName = translateToMyanmar(mmDate.my);

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
