import { CalendarDays } from "lucide-react";

export default function HeaderBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#8c5317] bg-gradient-to-r from-[#a35f1b] to-[#b87730] text-amber-50 shadow-md">
      <div className="mx-auto flex max-w-[1460px] items-center gap-3 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100/90 text-[#a35f1b]">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide md:text-base">Myanmar Calendar</p>
            <p className="text-xs text-amber-100/90">Western Calendar</p>
          </div>
        </div>
      </div>
    </header>
  );
}
