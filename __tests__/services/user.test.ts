/**
 * @jest-environment node
 */

import dbConnect from "@/shared/lib/dbConnect";
import { getUserData } from "@/shared/api/user";
import { describe } from "node:test";

describe("getData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(async () => {
    const conn = await dbConnect();
    await conn.disconnect();
  });
  it("Flag = all, we get all data", async () => {
    const res = await getUserData("testUser", "all");

    expect(res).toEqual({
      data: expect.objectContaining({
        __v: 0,
        _id: "667088618f447e7c54cdbeab",
        config: {
          profileVisibility: "public",
          showEmptyFolders: true,
        },
        email: "testuser@testuser.ru",
        folders: ["Default"],
        username: "testuser",
      }),
      success: true,
    });
  });
  it("Flag = config, we get only id and config", async () => {
    const res = await getUserData("testUser", "config");
    expect(res).toEqual({
      data: {
        _id: "667088618f447e7c54cdbeab",
        config: {
          profileVisibility: "public",
          showEmptyFolders: true,
        },
      },
      success: true,
    });
  });
  it("Flag = folders, we get config and  folders", async () => {
    const res = await getUserData("testUser", "folders");
    expect(res).toEqual({
      data: {
        _id: "667088618f447e7c54cdbeab",
        folders: ["Default"],
        config: {
          profileVisibility: "public",
          showEmptyFolders: true,
        },
      },
      success: true,
    });
  });
});
