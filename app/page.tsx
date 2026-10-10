
import Header from "@/components/Header";
import NextPrayer from "@/components/NextPrayer";
import PrayerTimes from "@/components/PrayerTimes";
import CitySelector from "@/components/CitySelector";

import { cities } from "@/data/cities";

import {
  getPrayerTimes,
  getDateByOffset,
} from "@/lib/aladhan";

type HomeProps = {
  searchParams: Promise<{
    city?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const params = await searchParams;

  const selectedCity = cities.find(
    (city) => city.name === params.city
  ) ?? cities[0];

  const city = selectedCity.name;
  const country = selectedCity.country;

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

      <section className="px-6 pt-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-lg font-semibold">
            Choose your city
          </h2>

          <CitySelector selectedCity={city} />
        </div>
      </section>

      <NextPrayer
        prayers={allPrayers}
        city={city}
        date={today}
      />

      <PrayerTimes prayers={todayPrayers} />
    </main>
  );
}
