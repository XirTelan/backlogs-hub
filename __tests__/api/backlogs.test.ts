/**
 * @jest-environment node
 */

import { getCurrentUserInfo } from "@/auth/utils";
import { GET, PATCH, POST } from "../../src/app/api/backlogs/route"; // Import your API route handler
import { NextRequest } from "next/server";

jest.mock("../../src/services/backlogs", () => ({
  getBacklogsByUserName: jest.fn((username) => {
    if (username) {
      return [{ id: 1 }, { id: 2 }, { id: 3 }];
    } else {
      return { msg: "username required" };
    }
  }),
  getUserBacklogBySlug: jest.fn((username, backlog) => {
    return {
      _id: "111",
      backlogTitle: backlog,
      userName: username,
      userId: "111",
      visibility: "public",
    };
  }),
  getBacklogsBaseInfoByUserName: jest.fn(() => {
    return {
      slug: "games",
      backlogTitle: "games",
      order: 99,
    };
  }),
  updateBacklogsOrderById: jest.fn((data) => {
    if (!data) return { msg: "error" };
  }),
  isBacklogExist: jest.fn((username, backlog) => {
    if (username === "xir_telan" && backlog === "games") return { _id: "111" };
    else return undefined;
  }),
}));
jest.mock("../../src/services/backlogItem", () => ({
  getBacklogItemsByBacklogId: jest.fn((id) => {
    if (id === "111") return [{ id: "1" }, { id: "2" }];
  }),
}));
jest.mock("../../src/auth/utils", () => ({
  getCurrentUserInfo: jest.fn(() => {
    return { username: "xir_telan" };
  }),
}));

describe("API api/backlogs/route", () => {
  describe("API GET Route Handler", () => {
    const makeMockReq = (type: string, backlog: string) => {
      return {
        nextUrl: {
          searchParams: new URLSearchParams({
            backlog: backlog,
            type: type,
          }),
        },
      };
    };
    it("Test Type===exist.  should return expected response without userName specified in params. Asume weare loged in", async () => {
      const res = await GET(makeMockReq("exist", "games") as NextRequest);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        backlog: { _id: "111" },
      });
    });
    it("Test Type===baseInfo.  should return backlog and items ", async () => {
      const res = await GET(makeMockReq("baseInfo", "games") as NextRequest);
      const expectedResult = {
        backlog: {
          slug: "games",
          backlogTitle: "games",
          order: 99,
        },
      };
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(expectedResult);
    });
    it("Test Type===withData.  should return backlog and items", async () => {
      const res = await GET(makeMockReq("withData", "games") as NextRequest);
      const expectedResult = {
        backlog: {
          _id: "111",
          backlogTitle: "games",
          userId: "111",
          userName: "xir_telan",
          visibility: "public",
        },
        backlogData: [
          {
            id: "1",
          },
          {
            id: "2",
          },
        ],
      };
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(expectedResult);
    });
    it("Without type.   should return one backlog   ", async () => {
      const res = await GET(makeMockReq("", "games") as NextRequest);
      const expectedResult = {
        backlog: {
          _id: "111",
          backlogTitle: "games",
          userId: "111",
          userName: "xir_telan",
          visibility: "public",
        },
      };
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(expectedResult);
    });
    it("Empty type and backlogSlug. Should return all backlogs for username ", async () => {
      const res = await GET(makeMockReq("", "") as NextRequest);
      const expectedResult = {
        backlog: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
      };
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(expectedResult);
    });
    it("with undefined userName in params and sign out", async () => {
      (getCurrentUserInfo as jest.Mock).mockResolvedValueOnce(undefined);
      const res = await GET(makeMockReq("exist", "games") as NextRequest);
      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        message: "Params not provided",
      });
    });
  });

  describe("API PATCH Route Handler", () => {
    const makeMockReq = () => {
      return {
        json: () => {
          return Promise.resolve([{ id: 1 }, { id: 2 }]);
        },
      };
    };
    it("patch", async () => {
      const res = await PATCH(makeMockReq() as NextRequest);
      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({
        message: "Created",
      });
    });
  });

  describe("API POST Route Handler", () => {
    const makeMockReq = () => {
      return {
        json: () => {
          return Promise.resolve([{ id: 1 }, { id: 2 }]);
        },
      };
    };
    it("no user", async () => {
      (getCurrentUserInfo as jest.Mock).mockResolvedValueOnce(undefined);
      const res = await POST(makeMockReq() as NextRequest);
      expect(res.status).toBe(401);
    });
    it("Post ", async () => {
      const res = await POST(makeMockReq() as NextRequest);
      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({
        message: "Created",
      });
    });
  });
});
