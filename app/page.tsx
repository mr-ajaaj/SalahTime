import Header from "@/components/Header";
import NextPrayer from "@/components/NextPrayer";
import PrayerTimes from "@/components/PrayerTimes";
import {
  getPrayerTimes,
  getDateByOffset,
} from "@/lib/aladhan";

export default async function Home() {
  const city = "Tangier";
  const country = "Morocco";

  const today = getDateByOffset(0);
  const tomorrow = getDateByOffset(1);

  const [todayPrayers, tomorrowPrayers] =
    await Promise.all([
      getPrayerTimes(city, country, today),
      getPrayerTimes(city, country, tomorrow),
    ]);

  const allPrayers = [
    ...todayPrayers,
    ...tomorrowPrayers,
  ];

  return (
    <main>
      <Header />

      <NextPrayer
        prayers={allPrayers}
        city={city}
        date={today}
      />

      <PrayerTimes prayers={todayPrayers} />
    </main>
  );
}