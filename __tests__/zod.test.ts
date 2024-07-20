import { BacklogFormSchema, RegistrationSchema } from "@/zod";

describe("regestrationForm parse test", () => {
  it("parse isSuccess if password and conffirm Password same", () => {
    const parsedData = RegistrationSchema.safeParse({
      username: "testuser",
      email: "test@test.com",
      password: "123456",
      passwordConfirm: "123456",
    });
    expect(parsedData.success).toBe(true);
  });
  it("must be false if password and confirm are diffent", () => {
    const parsedData = RegistrationSchema.safeParse({
      username: "testuser",
      email: "test@test.com",
      password: "654321",
      passwordConfirm: "123456",
    });
    expect(parsedData.success).toBe(false);
  });
});

describe("BacklogFormSchema", () => {
  it("uniqueArray rule validation, ", () => {
    const parsedData = BacklogFormSchema.safeParse({
      backlogTitle: "backlogTitle",
      slug: "slug",
      categories: [
        { name: "1", color: "#ffffff", protected: false },
        { name: "2", color: "#ffffff", protected: false },
      ],
    });

    expect(parsedData.success).toBe(true);
  });
  it("uniqueArray rule validation, ", () => {
    const parsedData = BacklogFormSchema.safeParse({
      backlogTitle: "backlogTitle",
      slug: "slug",
      categories: [
        { name: "1", color: "#ffffff", protected: false },
        { name: "1", color: "#ffffff", protected: false },
      ],
    });

    expect(parsedData.success).toBe(false);
    expect(parsedData.error?.errors).toEqual(
      expect.arrayContaining([
        {
          code: "custom",
          message: "No duplicates allowed.",
          path: ["categories", 1, "name"],
        },
      ]),
    );
  });
});
