import Header from "@/components/Header";
import NextPrayer from "@/components/NextPrayer";
import PrayerTimes from "@/components/PrayerTimes";
import { prayers } from "@/data/prayers";

export default function Home() {
  return (
    <main>
      <Header />
      <NextPrayer prayers={prayers} />
      <PrayerTimes />
    </main>
  );
}
