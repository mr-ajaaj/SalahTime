import type { Prayer } from "@/lib/aladhan";

type PrayerTimesProps = {
  prayers: Prayer[];
};

export default function PrayerTimes({ prayers }: PrayerTimesProps) {
  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-xl font-semibold">Today's Prayer Times</h2>

        <div className="rounded-2xl border">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex items-center justify-between border-b px-6 py-4 last:border-b-0"
            >
              <span className="text-sm font-medium">{prayer.name}</span>

              <span className="text-sm text-gray-500">{prayer.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
