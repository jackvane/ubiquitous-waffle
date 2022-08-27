import { createClient } from "edgedb";
import e from "../../dbschema/edgeql-js";
import {
  countries as countryInputs,
  cities as japanCities,
  languages as asianLanguages,
  currencies as asianCurrencies,
  professions as techProfessions,
  brands,
} from "./data";

const client = createClient();

async function seedCountries() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Country, {
        common_name: e.cast(e.str, item.common_name),
        official_name: e.cast(e.str, item.official_name),
        localized_name: e.cast(e.str, item.localized_name),
        iso_code_2: e.cast(e.str, item.iso_code_2),
        iso_code_3: e.cast(e.str, item.iso_code_3),
      });
    });
  });

  return q.run(client, {
    items: countryInputs,
  });
}

async function seedCities() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.City, {
        name: e.cast(e.str, item.name),
        latitude: e.cast(e.float64, item.latitude),
        longitude: e.cast(e.float64, item.longitude),
        country: e.select(e.Country, (country) => ({
          filter: e.op(country.iso_code_2, "=", "JP"),
        })),
      });
    });
  });

  return q.run(client, {
    items: japanCities,
  });
}

async function seedLanguages() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Language, {
        language: e.cast(e.str, item.language),
        language_code: e.cast(e.str, item.language_code),
        region: e.cast(e.str, item.region),
        region_code: e.cast(e.str, item.region_code),
      });
    });
  });

  return q.run(client, {
    items: asianLanguages,
  });
}

async function seedCurrencies() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Currency, {
        code: e.cast(e.str, item.code),
        name: e.cast(e.str, item.name),
        symbol: e.cast(e.str, item.symbol),
      });
    });
  });

  return q.run(client, {
    items: asianCurrencies,
  });
}

async function seedProfessions() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Profession, {
        title: e.cast(e.str, item.title),
        industry: e.cast(e.Industry, item.industry),
      });
    });
  });

  return q.run(client, { items: techProfessions });
}

async function seedBrands() {
  const q = e.params({ items: e.json }, (params) => {
    return e.for(e.json_array_unpack(params.items), (item) => {
      return e.insert(e.Brand, {
        name: e.cast(e.str, item.name),
        namespace: e.cast(e.str, item.namespace),
        industry: e.cast(e.Industry, item.industry),
        website: e.cast(e.str, item.website),
        is_verified: e.cast(e.bool, item.is_verified),
      });
    });
  });

  return q.run(client, { items: brands });
}

async function seedJobs() {
  // create jobs from professions
  const salary = () => {
    const min = Math.floor(Math.random() * (15 - 6) + 6);
    const max = Math.floor(Math.random() * (30 - min) + min);

    return { min, max };
  };

  const professions = await e
    .select(e.Profession, (profession) => ({
      id: true,
      title: true,
      industry: true,
      filter: e.op(profession.industry, "=", e.Industry.Information_Technology),
    }))
    .run(client);

  interface JobInput {
    title: string;
    description: string;
    salary_min: number;
    salary_max: number;
    interviews_to_hire: number;
  }

  const jobs = professions.map((profession) => {
    const salaryRange = salary();

    const job: JobInput = {
      title: profession.title,
      description: "lorem ipsum",
      salary_max: salaryRange.max,
      salary_min: salaryRange.min,
      interviews_to_hire: 1,
    };

    return job;
  });

  // get tokyo
  const cities = await e
    .select(e.City, (city) => ({
      filter: e.op(city.name, "=", "Tokyo"),
    }))
    .run(client);

  if (cities.length < 1) {
    throw new Error("Tokyo not found");
  }

  const tokyo = cities[0];

  // get english and japanese
  const languages = await e
    .select(e.Language, (language) => ({
      id: true,
      language_code: true,
      filter: e.op(
        language.language_code,
        "in",
        e.array_unpack(e.array(["en", "ja"]))
      ),
    }))
    .run(client);

  if (languages.length < 1) {
    throw new Error("English and/or Japanese languages not found");
  }

  const english = languages.find((lang) => lang.language_code === "en");

  if (!english) {
    throw new Error("English language not found");
  }

  const japanese = languages.find((lang) => lang.language_code === "ja");

  if (!japanese) {
    throw new Error("Japanese language not found");
  }

  // get currency
  const yen = await e.select(e.Currency, (currency) => ({
    filter: e.op(currency.code, "=", "JPY"),
  }));

  if (!japanese) {
    throw new Error("Japanese Yen not found");
  }

  // get all seeded brands
  const brands = await e
    .select(e.Brand, () => ({
      id: true,
    }))
    .run(client);

  // create open jobs for each brand
  brands.map(async (b) => {
    const q = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e.insert(e.Job, {
          title: e.cast(e.str, item.title),
          description: e.cast(e.str, item.description),
          salary_min: e.cast(e.int64, item.salary_min),
          salary_max: e.cast(e.int64, item.salary_max),
          interviews_to_hire: e.cast(e.int16, item.interviews_to_hire),
          brand: e.select(e.Brand, (brand) => ({
            filter: e.op(brand.id, "=", e.uuid(b.id)),
          })),
          city: e.select(e.City, (city) => ({
            filter: e.op(city.id, "=", e.uuid(tokyo.id)),
          })),
          languages: e.select(e.Language, (language) => ({
            filter: e.op(
              language.id,
              "in",
              e.array_unpack(e.array([e.uuid(english.id), e.uuid(japanese.id)]))
            ),
          })),
          currency: e.select(e.Currency, (currency) => ({
            filter: e.op(currency.id, "=", yen.id),
          })),
        });
      });
    });

    return q.run(client, { items: jobs });
  });
}

async function main() {
  await seedCountries();
  await seedCities();
  await seedLanguages();
  await seedCurrencies();
  await seedProfessions();
  await seedBrands();
  await seedJobs();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.close();
  });
