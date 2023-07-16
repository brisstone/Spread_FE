export enum EnterpriseRole {
  OWNER = "OwnerRole",
  ADMIN = "AdminRole",
  LEAD = "LeadRole",
  OPERATOR = "OperatorRole",
  READER = "ReaderRole",
  CLIENT = "ClientRole",
}

export const roleMap = {
  [EnterpriseRole.OWNER]: "Propriétaire",
  [EnterpriseRole.ADMIN]: "Admin",
  [EnterpriseRole.LEAD]: "Chef de file",
  [EnterpriseRole.OPERATOR]: "Opérateur",
  [EnterpriseRole.READER]: "Accès en lecture",
  [EnterpriseRole.CLIENT]: "Client",
};

export enum StorageEnum {
  ENT_CONTEXT = "enterprise_context",
}

export enum DragTypes {
  CRMLEAD = "crmLead",
  KANBANITEM = "kanbanItem",
}

export enum QuestionType {
  TEXT = "text",
  DATE = "date",
  SELECT = "select",
}

export enum KanbanDefault {
  CLOSED = "Fermémmmmm",
  BACKLOG = "Arriéré",
  PROGRESS = "En cours",
}

export enum InvoiceType {
  SIMPLE = "simple",
  RECURRENT = "recurrent",
}

export enum AlertType {
  ERROR = "error",
  SUCCESS = "success",
}

export enum ExpenseType {
  UNIQUE = "unique",
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export const expenseTypeMap: { [key: string]: string } = {
  [ExpenseType.UNIQUE]: "Unique",
  [ExpenseType.MONTHLY]: "Mensuelle",
  [ExpenseType.ANNUAL]: "Annuelle",
};

export enum ConversationType {
  DIRECT = "direct",
  GROUP = "group",
}

export enum ConversationListType {
  TEAM = 'team',
  CLIENT = 'client'
}

export const baseUserTokenId = 'noent';

export enum TaskType {
  CLIENT = 'client',
  ENTERPRISE = 'enterprise',
}
