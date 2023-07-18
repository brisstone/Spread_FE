import { ConversationType, EnterpriseRole, QuestionType } from "./enum";

export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseUser extends BaseModel {
  email: string;
  emailVerifiedAt: string;
}

export interface User extends BaseModel {
  baseUser: BaseUser;
  baseUserId: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  country: string | null;
  profileImageKey: string | null;
  profileImageUrl: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  enterpriseId: string;
  enterpriseRole: Role;
}

export interface UserWithEnterprise extends User {
  enterprise: Enterprise;
}

type UserDetail = Pick<
  User,
  | "id"
  | "baseUser"
  | "firstName"
  | "lastName"
  | "enterpriseRole"
  | "profileImageKey"
  | "profileImageUrl"
>;

export interface Enterprise extends BaseModel {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  socials: string[];
  includeLogoInInvoice: boolean;
  includeLogoInEmail: boolean;
  subscriptionActive: boolean;
}

type MinimalBaseUser = Pick<BaseUser, "id" | "email">;

type IMinimalBaseUser = {
  baseUser: MinimalBaseUser;
};

export type MinimalUser = Pick<
  User,
  "id" | "firstName" | "lastName" | "profileImageKey" | "profileImageUrl"
> &
  IMinimalBaseUser;

export type MinimalUserWithRole = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "enterpriseRole"
  | "profileImageKey"
  | "profileImageUrl"
> &
  IMinimalBaseUser;

export interface Conversation extends BaseModel {
  type: ConversationType;
  users: MinimalUserWithRole[];
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
  onboarding: LeadOnboarding | null;
  status?: string
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
  brief: string | null;
  invitationMessage: string | null;
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

export interface DefaultBillingSettings {
  currency: string;
  tax: number;
  discount: number;
  amount: number;
  title: string;
  description: string;
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
  notes: string | null;
  discount: number | null;
  tax: number | null;
  paidAt: Date | null;
  items: InvoiceItem[];
  enterpriseId: string;
}

export interface NameOnly extends BaseModel {
  name: EnterpriseRole;
}

export type Role = NameOnly;

export interface EnterpriseInvitation extends BaseModel {
  email: string;
  token: string;
  expiresAt: Date;
  acceptedAt: Date | null;
  enterprise: Enterprise;
  enterpriseId: string;
  enterpriseRole: Role;
}

export interface DocumentFolder extends BaseModel {
  name: string;
  enterpriseId: string;
}

export interface DocumentFile extends BaseModel {
  name: string;
  key: string;
  url: string;
  fileType: string;
  folder: DocumentFolder;
  folderId: string;
}

type ExpenseCategory = NameOnly;

export interface Expense extends BaseModel {
  name: string;
  description: string | null;
  type: ExpenseType;
  currency: InvoiceCurrency;
  currencyId: string;
  date: Date | null;
  amount: number;
  category: ExpenseCategory;
  categoryId: string;
  enterpriseId: string;
}

export interface SocketErrorStatus {
  errors: string[];
  status: string;
}

export interface LeadOnboarding extends BaseModel {
  leadId: string;
  lead: CRMLead;
  data: {
    category: string;
    question: string;
    answer: string;
  }[];
  completedAt: Date | null;
}

export interface OnboardingDetail {
  questionCategories: QuestionCategoryWithQuestions[];
  onboarding: LeadOnboarding;
}

export interface CRMCategoryWithCount extends CRMCategory {
  leadCount: number;
}

export interface StripePrice {
  id: string;
  currency: string;
  product: StripeProduct;
  unit_amount: number;
  lookup_key?: string;
}

export interface StripeProduct {
  id: string;
  description: string;
  name: string;
  metadata: {
    rank: `${number}`;
  };
}

export type InvoiceReport = Client & { unpaidCount: `${number}` };

export interface StripeInvoice {
  id: string;
  currency: string;
  amount_paid: number;
  amount_due: number;
  invoice_pdf: string;
  status_transitions: {
    finalized_at: number | null;
    marked_uncollectible_at: number | null;
    paid_at: number | null;
    voided_at: number | null;
  };
}

export interface StripeSubscription {
  id: string;
  default_payment_method: {
    card: {
      brand: string;
      exp_month: number;
      exp_year: number;
      last4: string;
    };
  };
}

export interface IKPI {
  name: string;
  value: string;
  sideValue?: string;
}

export interface ClientTurnover {
  yearCreated: number;
  monthCreated: number;
  totalClients: number;
}

export interface TurnoverData {
  month: number;
  currentYearData: `${number}` | number;
  prevYearData: `${number}` | number;
}
