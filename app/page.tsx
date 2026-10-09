import Header from "@/components/Header";
import NextPrayer from "@/components/NextPrayer";
import PrayerTimes from "@/components/PrayerTimes";
import {
  getPrayerTimes,
  getTodayDate,
} from "@/lib/aladhan";

export default async function Home() {
  const city = "Tangier";
  const country = "Morocco";

  const date = getTodayDate();

  const prayers = await getPrayerTimes(
    city,
    country,
    date
  );

  return (
    <main>
      <Header />

      <NextPrayer
        prayers={prayers}
        city={city}
        date={date}
      />

      <PrayerTimes prayers={prayers} />
    </main>
  );
}