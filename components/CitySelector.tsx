
import { cities } from "@/data/cities";

type CitySelectorProps = {
  selectedCity: string;
};

export default function CitySelector({
  selectedCity,
}: CitySelectorProps) {
  return (
    <form
      action="/"
      method="get"
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label
        htmlFor="city"
        className="sr-only"
      >
        Select your city
      </label>

      <select
        id="city"
        name="city"
        defaultValue={selectedCity}
        className="rounded-xl border bg-transparent px-4 py-3 text-sm"
      >
        {cities.map((city) => (
          <option
            key={city.name}
            value={city.name}
          >
            {city.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
      >
        Update City
      </button>
    </form>
  );
}
