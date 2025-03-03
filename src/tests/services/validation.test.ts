import {
  checkRequiredFields,
  checkEmailFormat,
  validateUsers,
  checkUniqueID,
} from "../../services/validation";
import { logValidationErrors } from "../../utils/errorLogger";

jest.mock("../../utils/errorLogger", () => ({
  logValidationErrors: jest.fn(),
}));

describe("Validation Functions", () => {
  describe("Test checkRequiredFields", () => {
    it("should return true for valid user", () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["tag1"],
      };
      expect(checkRequiredFields(user)).toBe(true);
    });

    it("should return true for valid user even if it has extra fields", () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["tag1"],
        extra: true,
      };
      expect(checkRequiredFields(user)).toBe(true);
    });

    it("should return true for valid user even if 'tags' array contains non-string values", () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["tag1", 2, false],
      };
      expect(checkRequiredFields(user)).toBe(true);
    });

    it("should throw error for incorrect type", () => {
      const user = {
        id: "1",
        name: "John Doe",
        status: "active",
        tags: ["tag1"],
      };
      expect(() => checkRequiredFields(user)).toThrow(
        "Field 'id' has an incorrect type"
      );
    });

    it("should throw error for first incorrect type when there are multiple incorrect types", () => {
      const user = {
        id: 1,
        name: 1,
        status: false,
        tags: ["tag1"],
      };
      expect(() => checkRequiredFields(user)).toThrow(
        "Field 'name' has an incorrect type"
      );
    });

    it("should throw error if 'tags' is not an array", () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: 0,
      };
      expect(() => checkRequiredFields(user)).toThrow(
        "Field 'tags' has an incorrect type"
      );
    });

    it("should throw error for missing field", () => {
      const user = {
        id: 1,
        name: "John Doe",
        status: "active",
        tags: ["tag1"],
      };
      expect(() => checkRequiredFields(user)).toThrow(
        "User is missing 'email' field"
      );
    });

    it("should throw error for first missing field when there are multiple missing fields", () => {
      const user = {
        id: 1,
        status: "active",
        tags: ["tag1"],
      };
      expect(() => checkRequiredFields(user)).toThrow(
        "User is missing 'name' field"
      );
    });
  });

  describe("Test checkEmailFormat", () => {
    it("should return true for valid email format", () => {
      expect(checkEmailFormat("john@example.com")).toBe(true);
    });

    it("should throw error for invalid email format: missing @", () => {
      expect(() => checkEmailFormat("johnexample.com")).toThrow(
        "Value for 'email' has an incorrect format"
      );
    });

    it("should throw error for invalid email format: missing domain", () => {
      expect(() => checkEmailFormat("john@example")).toThrow(
        "Value for 'email' has an incorrect format"
      );
    });
  });

  describe("Test checkRequiredFields", () => {
    it("should return true for unique ID", () => {
      const usersIDs = [0, 1, 2, -1, 4, -1, 6, 7, 112];
      expect(checkUniqueID(usersIDs, 2, 2)).toBe(true);
    });

    it("should throw an error for duplicated ID", () => {
      const usersIDs = [0, 1, 2, -1, 4, -1, 2, 7, 112];
      expect(() => checkUniqueID(usersIDs, 2, 6)).toThrow(
        "User 'id' 2 is duplicated"
      );
    });
  });

  describe("Test validateUsers", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return valid users when all required fields are correct", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          status: "inactive",
          tags: ["tag2"],
        },
      ];

      const result = validateUsers(users);
      expect(result).toEqual(users);
    });

    it("should return as valid users with correct required fields and extra fields", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          status: "inactive",
          tags: ["tag2"],
        },
        {
          id: 3,
          name: "Maria Garcia",
          email: "maria@garcia.com",
          status: "inactive",
          tags: ["tag3"],
          extra: true, // extra field
        },
      ];

      const result = validateUsers(users);
      expect(result).toEqual(users);
    });

    it("should return as valid users with correct required fields and non-string items in tags array", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          status: "inactive",
          tags: ["tag2"],
        },
        {
          id: 3,
          name: "Maria Garcia",
          email: "maria@garcia.com",
          status: "inactive",
          tags: ["tag3", 2, false], // non-string items
          extra: true,
        },
      ];

      const result = validateUsers(users);
      expect(result).toEqual(users);
    });

    it("should filter out users with missing required fields", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          tags: ["tag2"],
        }, // missing 'status'
      ];

      const result = validateUsers(users);
      expect(result).toHaveLength(1);
      expect(result).toEqual([users[0]]);
    });

    it("should filter out users with incorrect data types in required fields", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: "2", // incorrect 'id' type
          name: "Jane Smith",
          email: "jane@example.com",
          status: "inactive",
          tags: ["tag2"],
        },
      ];

      const result = validateUsers(users);
      expect(result).toHaveLength(1);
      expect(result).toEqual([users[0]]);
    });

    it("should filter out users with invalid email formats", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "janeexample.com", // invalid email format
          status: "inactive",
          tags: ["tag2"],
        },
      ];

      const result = validateUsers(users);
      expect(result).toEqual([users[0]]);
    });

    it("should filter out users with duplicated IDs", () => {
      const users = [
        {
          id: 5,
          name: "New User",
          email: "user@example.com",
          status: "active",
          tags: [1, "tag2", true, "tag4"],
        },
        {
          id: 5,
          name: "Duplicated ID User",
          email: "user@example.com",
          status: "active",
          tags: [1, "tag2", true, "tag4"],
        },
      ];

      const result = validateUsers(users);
      expect(result).toEqual([users[0]]);
    });

    it("should call the error logger when there are invalid users", () => {
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          tags: ["tag2"],
        }, // missing 'status'
      ];

      validateUsers(users);

      expect(logValidationErrors).toHaveBeenCalledTimes(1);
      expect(logValidationErrors).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            user: users[1],
            message: "User is missing 'status' field",
          }),
        ])
      );
    });
  });
});
