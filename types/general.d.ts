
export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface User extends BaseModel {
  email: string;
  firstName: string;
  lastName: string;
  enterpriseId: string;
}

export interface Enterprise extends BaseModel {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  socials: string[];
  includeLogoInInvoice: boolean;
  includeLogoInEmail: boolean;
}

export type MinimalUser = Pick<User, "id" | "email" | "firstName" | "lastName">;

export interface Conversation extends BaseModel {
  users: MinimalUser[];
  enterpriseId: string;
}

export interface Message extends BaseModel {
  text: string;
  conversationId: string;
  fromId: string;
  from: MinimalUser;
}

export interface CRMCategory extends BaseModel {
  name: string;
  enterpriseId: string;
  rank: number;
}

export interface CRMLead extends BaseModel {
  name: string;
  email: string;
  phoneNumber: string;
  amount: number;
  categoryId: string;
  category: CRMCategory;
}
