"use client";

import { useEffect, useState } from "react";
import type { Prayer } from "@/lib/aladhan";

type NextPrayerProps = {
  prayers: Prayer[];
  city: string;
  date: string;
};

const formatCountdown = (
  milliseconds: number
) => {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default function NextPrayer({
  prayers,
  city,
  date,
}: NextPrayerProps) {
  const [nextPrayer, setNextPrayer] =
    useState<Prayer | null>(null);

  const [countdown, setCountdown] =
    useState("00:00:00");

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();

      const upcomingPrayers = prayers
        .filter((prayer) => prayer.isPrayer)
        .map((prayer) => ({
          prayer,
          timestamp: new Date(
            prayer.datetime
          ).getTime(),
        }))
        .filter(
          (item) => item.timestamp > now
        );

      const nextPrayerData =
        upcomingPrayers[0];

      if (!nextPrayerData) {
        setNextPrayer(null);
        setCountdown("00:00:00");
        return;
      }

      setNextPrayer(nextPrayerData.prayer);

      const remaining =
        nextPrayerData.timestamp - now;

      setCountdown(
        formatCountdown(remaining)
      );
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [prayers]);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            {city}, Morocco
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            {date}
          </h1>
        </div>

        <div className="rounded-2xl border p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider">
            Next Prayer
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            {nextPrayer?.name ?? "No more prayers today"}
          </h2>

          <p className="mt-2 text-3xl">
            {nextPrayer?.time ?? "--:--"}
          </p>

          <p className="mt-6 text-sm text-gray-500">
            {countdown} remaining
          </p>
        </div>
      </div>
    </section>
  );
}