"use client";

import { useState, type ReactNode } from "react";

export function SidebarToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-filter-toggle btn btn-ghost btn-sm w-full"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      <aside className={open ? "sidebar-open" : undefined}>{children}</aside>
    </>
  );
}
