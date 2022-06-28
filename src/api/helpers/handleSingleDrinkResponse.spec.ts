import { assert, beforeEach, describe, it } from "vitest";
import { MockedResponse } from "../../mocks/Response.mock";
import { handleSingleDrinkResponse } from "./handleSingleDrinkResponse";
import type { ApiResponseDto } from "../../dtos/ApiResponseDto";
import type { DrinkDto } from "../../dtos/DrinkDto";

describe("handleSingleDrinkResponse", () => {
  let drinkDto: DrinkDto;
  let anotherDrinkDto: DrinkDto;

  beforeEach(() => {
    drinkDto = { idDrink: "a drink" } as DrinkDto;
    anotherDrinkDto = { idDrink: "another drink" } as DrinkDto;
  });

  it("should return expected drink", async () => {
    const responsePayload: ApiResponseDto = {
      drinks: [drinkDto],
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
      drinks: [drinkDto, anotherDrinkDto],
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
