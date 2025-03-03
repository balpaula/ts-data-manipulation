import { EMAIL_REGEXP, USER_KEYS, USER_SCHEMA } from "../core/consts";
import { statusOptions, User, UserError } from "../core/model";
import { ValidationError } from "../errors/ValidationError";
import { logValidationErrors } from "../utils/errorLogger";

// Check that the user has all required fields with correct types
export const checkRequiredFields = (user: Record<string, any>): boolean => {
  return USER_KEYS.every((key) => {
    if (Object.keys(user).includes(key)) {
      if (
        typeof user[key] == USER_SCHEMA[key as keyof User] ||
        (key === "status" && statusOptions.includes(user[key])) ||
        (key === "tags" && Array.isArray(user[key]))
      ) {
        return true;
      } else {
        throw new ValidationError(`Field '${key}' has an incorrect type`);
      }
    } else {
      throw new ValidationError(`User is missing '${key}' field`);
    }
  });
};

// Check that the email format is valid
export const checkEmailFormat = (email: string): boolean => {
  if (email && EMAIL_REGEXP.test(email)) {
    return true;
  } else {
    throw new ValidationError("Value for 'email' has an incorrect format");
  }
};

// Check that the user ID is unique (not duplicated)
export const checkUniqueID = (
  usersIDs: number[],
  id: number,
  index: number
): boolean => {
  if (usersIDs.indexOf(id) === index) {
    return true;
  } else {
    throw new ValidationError(`User 'id' ${id} is duplicated`);
  }
};

// Validate users array: return only users that are valid and logg the validation errors for the invalid ones
export const validateUsers = (
  data: Record<string, any>[]
): Record<string, any>[] => {
  const validationErrors: UserError[] = [];
  const usersIDs = data.map((user) => (user["id"] ? user["id"] : -1));

  const validUsers = data.filter((user: Record<string, any>, index: number) => {
    try {
      return (
        checkRequiredFields(user) &&
        checkEmailFormat(user["email"]) &&
        checkUniqueID(usersIDs, user["id"], index)
      );
    } catch (error) {
      validationErrors.push({ user: user, message: (error as Error).message });
      return false;
    }
  });

  logValidationErrors(validationErrors);

  return validUsers;
};
