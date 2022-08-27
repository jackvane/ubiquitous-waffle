import e from "../../edgeql-js";

export interface ProfessionBulkInput {
  title: string;
  industry?: typeof e.Industry.__tstype__;
}

export const professions: ProfessionBulkInput[] = [
  {
    title: "Front End Software Developer",
    industry: "Information Technology",
  },
  {
    title: "Back End Software Developer",
    industry: "Information Technology",
  },
  {
    title: "Site Reliability Developer",
    industry: "Information Technology",
  },
  {
    title: "Security Architect",
    industry: "Information Technology",
  },
  {
    title: "Security Analyst",
    industry: "Information Technology",
  },
  {
    title: "Threat Hunter",
    industry: "Information Technology",
  },
  {
    title: "Penetration Tester",
    industry: "Information Technology",
  },
  {
    title: "Adversarial Operator",
    industry: "Information Technology",
  },
  {
    title: "Database Architect",
    industry: "Information Technology",
  },
  {
    title: "UI/UX Designer",
    industry: "Information Technology",
  },
  {
    title: "Entrepreneur",
    industry: "Business & Finance",
  },
];
