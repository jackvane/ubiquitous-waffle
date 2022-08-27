export interface LanguageBulkInput {
  language: string;
  language_code: string;
  region: string;
  region_code: string;
}

export const languages: LanguageBulkInput[] = [
  {
    language: "English",
    language_code: "en",
    region: "United States",
    region_code: "US",
  },
  {
    language: "Tiếng Việt",
    language_code: "vi",
    region: "Việt Nam",
    region_code: "VN",
  },
  {
    language: "日本語",
    language_code: "ja",
    region: "日本",
    region_code: "JP",
  },
  {
    language: "한국어",
    language_code: "kr",
    region: "대한민국",
    region_code: "KO",
  },
  {
    language: "中文",
    language_code: "zh",
    region: "中国",
    region_code: "CN",
  },
  {
    language: "ไทย",
    language_code: "th",
    region: "ประเทศไทย",
    region_code: "TH",
  },
  {
    language: "Tagalog",
    language_code: "tl",
    region: "Pilipinas",
    region_code: "PH",
  },
  {
    language: "Bahasa Indonesia",
    language_code: "id",
    region: "Indonesia",
    region_code: "ID",
  },
  {
    language: "Melayu",
    language_code: "ms",
    region: "Malaysia",
    region_code: "MY",
  },
];
