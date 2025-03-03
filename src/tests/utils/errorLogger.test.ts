import pc from "picocolors";
import { UserError } from "../../core/model";
import { logValidationErrors } from "../../utils/errorLogger";

describe("logValidationErrors", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log validation errors correctly", () => {
    const validationErrors: UserError[] = [
      {
        user: { id: 1, name: "John Doe", email: "johnexample.com" },
        message: "Value for 'email' has an incorrect format",
      },
      {
        user: { id: 2, name: "Jane Doe" },
        message: "User is missing 'email' field",
      },
      {
        user: {
          id: 3,
          name: "Maria Garcia",
          email: "maria@example.com",
          status: false,
          tags: ["tag1"],
        },
        message: "Field 'status' has an incorrect type",
      },
    ];

    logValidationErrors(validationErrors);

    // Errors for user 1
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      pc.red("[Error]"),
      "Invalid user object:",
      validationErrors[0].user,
      "\n"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Rejection reason:",
      pc.red(validationErrors[0].message),
      "\n"
    );

    // Errors for user 2
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      pc.red("[Error]"),
      "Invalid user object:",
      validationErrors[1].user,
      "\n"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Rejection reason:",
      pc.red(validationErrors[1].message),
      "\n"
    );

    // Errors for user 3
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      pc.red("[Error]"),
      "Invalid user object:",
      validationErrors[2].user,
      "\n"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Rejection reason:",
      pc.red(validationErrors[2].message),
      "\n"
    );
  });
});
