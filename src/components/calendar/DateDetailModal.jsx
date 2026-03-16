import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DateDetailModal({
  open,
  onOpenChange,
  westernDate,
  myanmarDate,
  holiday,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden p-0" showClose={false}>
        <div className="border-b border-stone-200 bg-[linear-gradient(180deg,#fff8ef_0%,#fff_100%)] px-5 py-4">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-lg">Date Detail</DialogTitle>
            <DialogDescription className="font-semibold text-[#8a4f1b]">
              {westernDate}
            </DialogDescription>
          </DialogHeader>
        </div>

        {myanmarDate && (
          <div className="space-y-3 p-5">
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Myanmar Year
              </p>
              <p className="mt-1 text-base font-bold text-stone-800">
                {myanmarDate.yearMy}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                Myanmar Date
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-800">
                {myanmarDate.monthMy} {myanmarDate.dayPhaseMy}{" "}
                {myanmarDate.dayNumberMy}
              </p>
            </div>

            <div
              className={cn(
                "rounded-xl border px-3 py-2",
                holiday
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
                  holiday ? "text-rose-700" : "text-stone-700",
                )}
              >
                {holiday?.title ?? "No holiday"}
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
  );
}
