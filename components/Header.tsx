"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <span className="text-xl font-semibold">SalahTime</span>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a href="/">Prayer Times</a>
            </li>

            <li>
              <a href="/qibla">Qibla</a>
            </li>

            <li>
              <a href="/calendar">Calendar</a>
            </li>

            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={22} />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <a href="/">Prayer Times</a>
            </li>

            <li>
              <a href="/qibla">Qibla</a>
            </li>

            <li>
              <a href="/calendar">Calendar</a>
            </li>

            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}