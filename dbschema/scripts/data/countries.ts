export interface CountryBulkInput {
  common_name: string;
  official_name: string;
  localized_name: string;
  iso_code_2: string;
  iso_code_3: string;
}

export const countries: CountryBulkInput[] = [
  {
    common_name: "United States",
    official_name: "United States of America",
    localized_name: "United States",
    iso_code_2: "US",
    iso_code_3: "USA",
  },
  {
    common_name: "Australia",
    official_name: "Commonwealth of Australia",
    localized_name: "Australia",
    iso_code_2: "AU",
    iso_code_3: "AUS",
  },
  {
    common_name: "Canada",
    official_name: "Dominion of Canada",
    localized_name: "Canada",
    iso_code_2: "CA",
    iso_code_3: "CAN",
  },
  {
    common_name: "United Kingdom",
    official_name: "United Kingdom of Great Britain and Northern Ireland",
    localized_name: "United Kingdom",
    iso_code_2: "GB",
    iso_code_3: "GBR",
  },
  {
    common_name: "Japan",
    official_name: "Japan",
    localized_name: "日本",
    iso_code_2: "JP",
    iso_code_3: "JPN",
  },
  {
    common_name: "China",
    official_name: "People's Republic of China",
    localized_name: "中国",
    iso_code_2: "CN",
    iso_code_3: "CHN",
  },
  {
    common_name: "Hong Kong",
    official_name:
      "Hong Kong Special Administrative Region of the People's Republic of China",
    localized_name: "香港",
    iso_code_2: "HK",
    iso_code_3: "HKG",
  },
  {
    common_name: "Vietnam",
    official_name: "Socialist Republic of Viet Nam",
    localized_name: "Việt Nam",
    iso_code_2: "VN",
    iso_code_3: "VNM",
  },
  {
    common_name: "South Korea",
    official_name: "Republic of Korea",
    localized_name: "대한민국",
    iso_code_2: "KR",
    iso_code_3: "KOR",
  },
  {
    common_name: "Singapore",
    official_name: "Republic of Singapore",
    localized_name: "Singapore",
    iso_code_2: "SG",
    iso_code_3: "SGP",
  },
  {
    common_name: "Indonesia",
    official_name: "Republic of Indonesia",
    localized_name: "Indonesia",
    iso_code_2: "ID",
    iso_code_3: "IDN",
  },
  {
    common_name: "Thailand",
    official_name: "The Kingdom of Thailand",
    localized_name: "ประเทศไทย",
    iso_code_2: "TH",
    iso_code_3: "THA",
  },
];
