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
<<<<<<< HEAD
  CLOSED = "Fermémmmmm",
  BACKLOG = "Arriéré",
=======
  CLOSED = "Complété",
  BACKLOG = "À faire",
>>>>>>> f79d4f5079f37102fc3c5a524628d2fc0c26c2e1
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
