import { USER_KEYS } from "../core/consts";
import { User } from "../core/model";

// Filer out non-string tags
export const filterTags = (tags: any[]): string[] =>
  tags.filter((tag: any) => typeof tag === "string");

// Format user object to only contain the required fields
export const formatUser = (user: Record<string, any>): User => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) =>
      USER_KEYS.includes(key as keyof User)
    )
  ) as User;
};

// Transform users array: return an array with formatted users (only required fields and string tags)
export const transformUsers = (validUsers: Record<string, any>[]): User[] => {
  return validUsers.map((validUser: Record<string, any>) => {
    const formattedUser = formatUser(validUser);
    formattedUser.tags = filterTags(formattedUser.tags);
    return formattedUser;
  });
};
