"use client";

import { useEffect, useState } from "react";
import type { Prayer } from "@/data/prayers";

type NextPrayerProps = {
  prayers: Prayer[];
};

const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.max(
    0,
    Math.floor(milliseconds / 1000)
  );

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function NextPrayer({
  prayers,
}: NextPrayerProps) {
  const [nextPrayer, setNextPrayer] =
    useState<Prayer | null>(null);

  const [countdown, setCountdown] =
    useState("00:00:00");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      let nextPrayerData:
        | {
            prayer: Prayer;
            prayerDate: Date;
          }
        | undefined;

      for (const prayer of prayers) {
        const [hours, minutes] = prayer.time
          .split(":")
          .map(Number);

        const prayerDate = new Date();

        prayerDate.setHours(hours);
        prayerDate.setMinutes(minutes);
        prayerDate.setSeconds(0);
        prayerDate.setMilliseconds(0);

        if (prayerDate > now) {
          nextPrayerData = {
            prayer,
            prayerDate,
          };

          break;
        }
      }

      if (!nextPrayerData) {
        const firstPrayer = prayers[0];

        const [hours, minutes] = firstPrayer.time
          .split(":")
          .map(Number);

        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(hours);
        tomorrow.setMinutes(minutes);
        tomorrow.setSeconds(0);
        tomorrow.setMilliseconds(0);

        nextPrayerData = {
          prayer: firstPrayer,
          prayerDate: tomorrow,
        };
      }

      setNextPrayer(nextPrayerData.prayer);

      const remaining =
        nextPrayerData.prayerDate.getTime() -
        now.getTime();

      setCountdown(formatCountdown(remaining));
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
            Tangier, Morocco
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            Monday, September 30, 2026
          </h1>
        </div>

        <div className="rounded-2xl border p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider">
            Next Prayer
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            {nextPrayer?.name}
          </h2>

          <p className="mt-2 text-3xl">
            {nextPrayer?.time}
          </p>

          <p className="mt-6 text-sm text-gray-500">
            {countdown} remaining
          </p>
        </div>
      </div>
    </section>
  );
}