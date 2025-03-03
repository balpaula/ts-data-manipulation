import pc from "picocolors";
import { UserError } from "../core/model";

// Log validation erros for invalid users
export const logValidationErrors = (validationErrors: UserError[]) => {
  validationErrors.forEach((userError: UserError, idx: number) => {
    idx > 0 &&
      console.log("====================================================", "\n");
    console.error(
      pc.red("[Error]"),
      "Invalid user object:",
      userError.user,
      "\n"
    );
    console.error("Rejection reason:", pc.red(userError.message), "\n");
  });
};
