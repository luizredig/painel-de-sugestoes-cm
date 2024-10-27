export type Company = {
  id: string;
  name: string;
  isActive: boolean;
};

export type Suggestion = {
  id: string;
  title: string;
  description: string | null;
  companyId: string;
  company?: Company;
  isActive: boolean;
};
