type Prayer = {
  name: string;
  time: string;
};

const prayers: Prayer[] = [
  {
    name: "Fajr",
    time: "05:41",
  },
  {
    name: "Sunrise",
    time: "07:08",
  },
  {
    name: "Dhuhr",
    time: "13:28",
  },
  {
    name: "Asr",
    time: "17:02",
  },
  {
    name: "Maghrib",
    time: "19:21",
  },
  {
    name: "Isha",
    time: "20:42",
  },
];

export default function PrayerTimes() {
  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-xl font-semibold">
          Today's Prayer Times
        </h2>

        <div className="rounded-2xl border">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex items-center justify-between border-b px-6 py-4 last:border-b-0"
            >
              <span className="text-sm font-medium">
                {prayer.name}
              </span>

              <span className="text-sm text-gray-500">
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}