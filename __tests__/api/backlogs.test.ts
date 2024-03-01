/**
 * @jest-environment node
 */

import { getCurrentUserInfo } from "@/auth/utils";
import { GET } from "../../src/app/api/backlogs/route"; // Import your API route handler

jest.mock("../../src/services/backlogs", () => ({
  getUserBacklogBySlug: jest.fn(),
  getBacklogItemsByBacklogId: jest.fn(),
  getBacklogsBaseInfoByUserName: jest.fn(),
  isBacklogExist: jest.fn((username, backlog) => {
    if (username === "xir_telan" && backlog === "games") return { _id: "111" };
    else return undefined;
  }),
}));

jest.mock("../../src/auth/utils", () => ({
  getCurrentUserInfo: jest.fn(() => {
    return { username: "xir_telan" };
  }),
}));

describe("API GET Route Handler", () => {
  const mockNextRequest = {
    nextUrl: {
      searchParams: new URLSearchParams({
        backlog: "games",
        type: "exist",
      }),
    },
    cookies: {
      access_token: "mockAccessToken",
    },
  };
  it("Test Type===exist.  should return expected response without userName specified in params. Asume weare loged in", async () => {
    const res = await GET(mockNextRequest);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      backlog: { _id: "111" },
    });
  });
  it("with undefined userName in paramse and sign out", async () => {
    (getCurrentUserInfo as jest.Mock).mockResolvedValueOnce(undefined);
    const res = await GET(mockNextRequest);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: "Params not provided",
    });
  });
});
