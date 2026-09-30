import Header from "@/components/Header";
import NextPrayer from "@/components/NextPrayer";
import PrayerTimes from "@/components/PrayerTimes";
import { getPrayerTimes } from "@/lib/aladhan";

export default async function Home() {
  const prayers = await getPrayerTimes("Tangier", "Morocco", "30-09-2026");

  return (
    <main>
      <Header />
      <NextPrayer prayers={prayers} />
      <PrayerTimes prayers={prayers} />
    </main>
  );
}
