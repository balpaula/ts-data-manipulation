export const statusOptions = ["active", "inactive"] as const;
export type StatusType = (typeof statusOptions)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  status: StatusType;
  tags: string[];
}

export interface UserError {
  user: Record<string, any>;
  message: string;
}
