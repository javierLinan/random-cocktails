import { describe, it, expect } from "vitest";
import { MockedResponse } from "../../mocks/Response.mock";
import { throwErrorIfFails } from "./throwErrorIfFails";
import { InternalServerError } from "../errors/InternalServerError";
import { ServiceUnavailableError } from "../errors/ServiceUnavailableError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";

describe("throwErrorIfFails", () => {
  it("should throw InternalServerError if status code is 500", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 500,
      statusText: "error 500 dummy",
    });

    try {
      await throwErrorIfFails(response);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError);
      expect((error as Error).message).toBe("error 500 dummy");
    }
  });

  it("should throw InternalServerError if status code is 503", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 503,
      statusText: "error 503 dummy",
    });

    try {
      await throwErrorIfFails(response);
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceUnavailableError);
      expect((error as Error).message).toBe("error 503 dummy");
    }
  });

  it("should throw UnauthorizedError if status code is 401", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 401,
      statusText: "error 401 dummy",
    });

    try {
      await throwErrorIfFails(response);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect((error as Error).message).toBe("error 401 dummy");
    }
  });

  it("should throw ForbiddenError if status code is 403", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 403,
      statusText: "error 403 dummy",
    });

    try {
      await throwErrorIfFails(response);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenError);
      expect((error as Error).message).toBe("error 403 dummy");
    }
  });

  it("should throw Error in any other error case", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 404,
      statusText: "error 404 dummy",
    });

    try {
      await throwErrorIfFails(response);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("error 404 dummy");
    }
  });

  it("should not throw Error if response is ok", async () => {
    const response = new MockedResponse({
      ok: true,
      status: 200,
    });

    expect(() => throwErrorIfFails(response)).not.toThrowError();
  });
});
