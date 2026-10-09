export type Prayer = {
  name: string;
  time: string;
  datetime: string;
  isPrayer: boolean;
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


const TIME_ZONE = "Africa/Casablanca";

export function getDateByOffset(
  offsetDays: number
): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date());

  const day = Number(
    parts.find((part) => part.type === "day")?.value
  );

  const month = Number(
    parts.find((part) => part.type === "month")?.value
  );

  const year = Number(
    parts.find((part) => part.type === "year")?.value
  );

  const date = new Date(
    Date.UTC(year, month - 1, day + offsetDays)
  );

  const formattedParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  const nextDay = formattedParts.find(
    (part) => part.type === "day"
  )?.value;

  const nextMonth = formattedParts.find(
    (part) => part.type === "month"
  )?.value;

  const nextYear = formattedParts.find(
    (part) => part.type === "year"
  )?.value;

  return `${nextDay}-${nextMonth}-${nextYear}`;
}

export function getTodayDate(): string {
  return getDateByOffset(0);
}

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
  url.searchParams.set("timezonestring", "Africa/Casablanca");
  url.searchParams.set("iso8601", "true");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  const result: AlAdhanResponse = await response.json();

  const { timings } = result.data;

  const createPrayer = (
    name: string,
    datetime: string,
    isPrayer: boolean
  ): Prayer => {
    const time = datetime
      .split("T")[1]
      .slice(0, 5);

    return {
      name,
      time,
      datetime,
      isPrayer,
    };
  };

  return [
    createPrayer("Fajr", timings.Fajr, true),
    createPrayer("Sunrise", timings.Sunrise, false),
    createPrayer("Dhuhr", timings.Dhuhr, true),
    createPrayer("Asr", timings.Asr, true),
    createPrayer("Maghrib", timings.Maghrib, true),
    createPrayer("Isha", timings.Isha, true),
  ];
}