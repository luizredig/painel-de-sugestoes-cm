export interface Company {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string | null;
  companyId: string;
  statusId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
