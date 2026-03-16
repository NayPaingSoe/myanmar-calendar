import { useMemo, useRef, useState } from "react";

import { getHolidayForDate, getMyanmarDateData } from "@/lib/calendar/date-utils";

const SUPPRESS_OPEN_MONTH_MS = 280;

export default function useDateDetailModal(enableDetailModal = true) {
  const [detailDate, setDetailDate] = useState(null);
  const suppressOpenMonthUntilRef = useRef(0);

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

  const openDetailForDate = (date) => {
    if (!enableDetailModal) {
      return;
    }

    setDetailDate(date);
  };

  const clearDetail = () => {
    setDetailDate(null);
  };

  const shouldSuppressOpenMonth = () => Date.now() < suppressOpenMonthUntilRef.current;

  const handleModalOpenChange = (open) => {
    if (open) {
      return;
    }

    clearDetail();
    suppressOpenMonthUntilRef.current = Date.now() + SUPPRESS_OPEN_MONTH_MS;
  };

  return {
    detailHoliday,
    detailMyanmarDate,
    detailWesternDate,
    isDetailModalOpen: Boolean(enableDetailModal && detailDate && detailMyanmarDate),
    openDetailForDate,
    clearDetail,
    shouldSuppressOpenMonth,
    handleModalOpenChange,
  };
}
