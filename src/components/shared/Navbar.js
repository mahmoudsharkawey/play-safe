"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, CalendarDays, LineChart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold">Play Safe</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/events" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
              <CalendarDays className="h-4 w-4" /> Events
            </Link>
            <Link href="/insights" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
              <LineChart className="h-4 w-4" /> Insights
            </Link>
            <Link href="/about" className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
              <Info className="h-4 w-4" /> About
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button>Sign in</Button>
          </div>

          <button
            aria-label="Toggle Menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/events" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
              <CalendarDays className="h-4 w-4" /> Events
            </Link>
            <Link href="/insights" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
              <LineChart className="h-4 w-4" /> Insights
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
              <Info className="h-4 w-4" /> About
            </Link>
            <Button className="mt-2" onClick={() => setOpen(false)}>Sign in</Button>
          </div>
        </div>
      )}
    </header>
  );
}


