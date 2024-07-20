import User from "@/models/User";
import { getUserData } from "@/services/user";
import { describe } from "node:test";

describe("user", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("getData", async () => {
    const getSpy = jest.spyOn(User, "findOne").mockResolvedValueOnce({
      user: "testUser",
    });
    const res = await getUserData("testUser", "all");
    expect(res).toBe({ user: "testUser" });
  });
});
