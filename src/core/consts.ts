import { User } from "./model";

export const USER_KEYS = ["id", "name", "email", "status", "tags"];

export const USER_SCHEMA: Record<keyof User, string> = {
  id: "number",
  name: "string",
  email: "string",
  status: "StatusType",
  tags: "array",
};

export const EMAIL_REGEXP = new RegExp(
  "^(?!\\.)[\\w\\-_.]*[^.]@\\w+\\.\\w+(?:\\.\\w+)?[^.\\W]$"
);
