import { assert, describe, it } from "vitest";
import { MockedResponse } from "../../mocks/Response.mock";
import { handleSingleDrinkResponse } from "./handleSingleDrinkResponse";
import type { ApiResponseDto } from "../../dtos/ApiResponseDto";
import type { DrinkDto } from "../../dtos/DrinkDto";
import { mockDrink } from "../../mocks/Drink.mock";

describe("handleSingleDrinkResponse", () => {
  it("should return expected drink", async () => {
    const responsePayload: ApiResponseDto = {
      drinks: [mockDrink("a drink")],
    };
    const response = new MockedResponse({
      ok: true,
      status: 200,
      response: responsePayload,
    });
    const handledResponse = await handleSingleDrinkResponse(response);

    assert.deepEqual(handledResponse, {
      idDrink: "a drink",
    } as DrinkDto);
  });

  it("should return the first expected drink", async () => {
    const responsePayload: ApiResponseDto = {
      drinks: [mockDrink("a drink"), mockDrink("another drink")],
    };
    const response = new MockedResponse({
      ok: true,
      status: 200,
      response: responsePayload,
    });
    const handledResponse = await handleSingleDrinkResponse(response);

    assert.deepEqual(handledResponse, {
      idDrink: "a drink",
    } as DrinkDto);
  });

  it("should return undefined when status is not OK", async () => {
    const response = new MockedResponse({
      ok: false,
      status: 500,
    });
    const handledResponse = await handleSingleDrinkResponse(response);

    assert.deepEqual(handledResponse, undefined);
  });
});
