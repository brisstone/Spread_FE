export enum EnterpriseRole {
  OWNER = "OwnerRole",
  ADMIN = "AdminRole",
  LEAD = "LeadRole",
  OPERATOR = "OperatorRole",
  READER = "ReaderRole",
  CLIENT = "ClientRole",
}

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
  CLOSED = "Fermé",
  BACKLOG = "Arriéré",
  PROGRESS = "En cours",
}

export enum InvoiceType {
  SIMPLE = "simple",
  RECURRENT = "recurrent",
}

export enum AlertType {
  ERROR = 'error',
  SUCCESS = 'success',
}
