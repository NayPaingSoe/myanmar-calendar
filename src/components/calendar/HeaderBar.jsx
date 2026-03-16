export default function HeaderBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#0f5f59] bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-teal-50 shadow-md">
      <div className="mx-auto flex max-w-[1460px] items-center justify-center px-4 py-3 lg:px-6">
        <div className="leading-tight text-center">
          <p className="font-myanmar text-sm font-semibold tracking-wide md:text-base">
            မြန်မာ ပြက္ခဒိန်
          </p>
        </div>
      </div>
    </header>
  );
}
