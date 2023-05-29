import { EnterpriseRole, QuestionType } from "./enum";

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

export interface QuestionCategory extends BaseModel {
  name: string;
  enterpriseId: string;
}

export interface Question extends BaseModel {
  name: string;
  type: QuestionType;
  categoryId: string;
  enterpriseId: string;
}

export interface QuestionWithCategory extends Question {
  category: QuestionCategory;
}

export interface QuestionCategoryWithQuestions extends QuestionCategory {
  questions: Question[];
}

export interface Client extends BaseModel {
  name: string;
  email: string;
  brief: string;
  invitationMessage: string;
  leadId?: string;
  userId?: string;
  enterpriseId: string;
}

export interface ClientWithTeam extends Client {
  team: MinimalUser[];
}

export interface Task extends BaseModel {
  title: string;
  description: string;
  done: boolean;
  assignee: User;
  assigneeId: string;
  enterpriseId: string;
}

export interface KanbanCategory extends BaseModel {
  name: string;
  enterpriseId: string;
}

export interface KanbanItem extends BaseModel {
  title: string;
  description: string;
  assignee: User;
  assigneeId: string;
  closed: boolean;
  categoryId: string;
  enterpriseId: string;
}

export interface InvoiceCurrency extends BaseModel {
  name: string;
}

export interface InvoiceItem extends BaseModel {
  description: string;
  quantity: number;
  price: number;
  total: number;
  invoiceId: string;
}

export interface Invoice extends BaseModel {
  name: string;
  description: string | null;
  type: InvoiceType;
  currency: InvoiceCurrency;
  dueDate: Date;
  client: Client;
  clientId: string;
  notes: string |null;
  discount: number | null;
  tax: number | null;
  paidAt: Date | null;
  items: InvoiceItem[];
  enterpriseId: string;
}

export interface Role extends BaseModel {
  name: EnterpriseRole;
}

export interface EnterpriseInvitation extends BaseModel {
  email: string;
  token: string;
  expiresAt: Date;
  acceptedAt: Date | null;
  enterprise: Enterprise;
  enterpriseId: string;
  enterpriseRole: Role;
}