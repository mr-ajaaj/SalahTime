export type Prayer = {
  name: string;
  time: string;
};

type AlAdhanResponse = {
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
    };
  };
};

export async function getPrayerTimes(
  city: string,
  country: string,
  date: string
): Promise<Prayer[]> {
  const url = new URL(
    `https://api.aladhan.com/v1/timingsByCity/${date}`
  );

  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set("method", "21");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  const result: AlAdhanResponse = await response.json();

  const { timings } = result.data;

  return [
    { name: "Fajr", time: timings.Fajr },
    { name: "Sunrise", time: timings.Sunrise },
    { name: "Dhuhr", time: timings.Dhuhr },
    { name: "Asr", time: timings.Asr },
    { name: "Maghrib", time: timings.Maghrib },
    { name: "Isha", time: timings.Isha },
  ];
}