import {
  clamp,
  cleanParamString,
  generateSlug,
  parseSeconds,
  parseToSeconds,
  sendMsg,
} from "@/utils";

describe("generate slug", () => {
  it("Test capital", () => {
    const res = generateSlug("Somestring");
    expect(res).toBe("somestring");
  });
  it("Test spaces", () => {
    const res = generateSlug("Some string");
    expect(res).toBe("some-string");
  });
  it("Test cyrillic", () => {
    const res = generateSlug("Я какая-то ссылка    ");
    expect(res).toBe("ya-kakaya-to-ssylka");
  });
});

describe("cleanParamString", () => {
  it("removes double quotes from the string", () => {
    const input = 'abc"def"ghi"';
    const expectedOutput = "abcdefghi";
    expect(cleanParamString(input)).toBe(expectedOutput);
  });

  it("removes backslashes from the string", () => {
    const input = "abc\\def\\ghi\\";
    const expectedOutput = "abcdefghi";
    expect(cleanParamString(input)).toBe(expectedOutput);
  });

  it("removes both double quotes and backslashes from the string", () => {
    const input = 'abc\\"def\\ghi"';
    const expectedOutput = "abcdefghi";
    expect(cleanParamString(input)).toBe(expectedOutput);
  });
});

describe("sendMsg", () => {
  describe("success", () => {
    it("returns a success message with default status 200", async () => {
      const message = "Success message";
      const expectedResponse = {
        message: message,
      };
      const response = sendMsg.success(message);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(expectedResponse);
    });
  });

  describe("error", () => {
    it("returns an error message with default status 400", async () => {
      const errorMessage = "Error message";
      const expectedResponse = {
        message: errorMessage,
      };
      const response = sendMsg.error(errorMessage);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual(expectedResponse);
    });

    it("returns an error message from Error object with default status 400", async () => {
      const error = new Error("Test error");
      const errorMessage = error.message;
      const expectedResponse = {
        message: errorMessage,
      };
      const response = sendMsg.error(error);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual(expectedResponse);
    });

    it("returns an error message from string with custom status", async () => {
      const errorMessage = "Custom error message";
      const status = 500;
      const expectedResponse = {
        message: errorMessage,
      };
      const response = sendMsg.error(errorMessage, status);
      expect(response.status).toBe(status);
      expect(await response.json()).toEqual(expectedResponse);
    });
  });
});

describe("time pasre ", () => {
  it("parseToSeconds", () => {
    expect(parseToSeconds(2, 30, 10)).toBe(9010);
  });
  it("parseSeconds", () => {
    expect(parseSeconds(9010)).toStrictEqual({
      hh: 2,
      mm: 30,
      ss: 10,
    });
  });
});

describe("clamp", () => {
  it("normal", () => {
    const res = clamp(0, -10, 15);
    expect(res).toBe(0);
  });
  it("min test", () => {
    const res = clamp(0, 10, 15);
    expect(res).toBe(10);
  });
  it("max test", () => {
    const res = clamp(50, 10, 15);
    expect(res).toBe(15);
  });
});
