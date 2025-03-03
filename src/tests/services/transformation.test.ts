import { USER_KEYS } from "../../core/consts";
import {
  filterTags,
  formatUser,
  transformUsers,
} from "../../services/transformation";

describe("Transformation Functions", () => {
  describe("Test filterTags", () => {
    it("should filter out non-string values", () => {
      const tags = ["tag1", "tag2", 3, false, "tag5"];
      const filteredTags = ["tag1", "tag2", "tag5"];

      expect(filterTags(tags)).toEqual(filteredTags);
    });

    it("should handle empty arrays", () => {
      const tags: any[] = [];

      expect(filterTags(tags)).toEqual([]);
    });
  });

  describe("Test formatUser", () => {
    it("should return user with only the required fields", () => {
      const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["tag1"],
        extra: true,
        role: "developer",
      };
      const formattedUser = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["tag1"],
      };

      expect(formatUser(user)).toEqual(formattedUser);
      expect(Object.keys(formattedUser)).toEqual(USER_KEYS);
    });
  });

  describe("Test transformUsers", () => {
    it("should return an array of properly transformed users", () => {
      const rawUsers = [
        {
          id: 4,
          name: "Fourth User",
          email: "fourth@example.com",
          status: "active",
          tags: ["tag1"],
          extra: true,
        },
        {
          id: 5,
          name: "Fifth User",
          email: "fifth@example.com",
          status: "inactive",
          tags: [1, "tag2", true, "tag4"],
          role: "developer",
        },
      ];
      const transformedUsers = [
        {
          id: 4,
          name: "Fourth User",
          email: "fourth@example.com",
          status: "active",
          tags: ["tag1"],
        },
        {
          id: 5,
          name: "Fifth User",
          email: "fifth@example.com",
          status: "inactive",
          tags: ["tag2", "tag4"],
        },
      ];

      expect(transformUsers(rawUsers)).toEqual(transformedUsers);
    });
  });
});
