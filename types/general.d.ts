export interface User {
  email: string;
  firstName: string;
  lastName: string;
  enterpriseId: string;
}

export interface Enterprise {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  socials: string[];
  includeLogoInInvoice: boolean;
  includeLogoInEmail: boolean;
  createdAt: string;
  updatedAt: string;
}
