import e from "../../edgeql-js";

export interface BrandBulkInput {
  name: string;
  namespace: string;
  industry: typeof e.Industry.__tstype__;
  website: string;
  is_verified: boolean;
}

export const brands: BrandBulkInput[] = [
  {
    name: "Moichi",
    namespace: "moichi",
    industry: "Hospitality",
    website: "https://moichipancakes.com",
    is_verified: true,
  },
];
