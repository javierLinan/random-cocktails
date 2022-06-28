import {
  describe,
  vi,
  expect,
  it,
  afterEach,
  beforeEach,
  type SpyInstance,
} from "vitest";
import { DrinksResource } from "./DrinkResource";
import { MockedResponse } from "../mocks/Response.mock";
import type { DrinkDto } from "../dtos/DrinkDto";

describe("DrinkResource", () => {
  let drinkDto: DrinkDto;
  let anotherDrinkDto: DrinkDto;

  beforeEach(() => {
    drinkDto = { idDrink: "a drink" } as DrinkDto;
    anotherDrinkDto = { idDrink: "another drink" } as DrinkDto;
  });

  describe("getDrinkById", () => {
    let spyFetch: SpyInstance;
    let spyMap: SpyInstance;

    beforeEach(() => {
      spyFetch = vi.spyOn(DrinksResource.Instance, "fetch");
      spyMap = vi.spyOn(DrinksResource.Instance, "mapDrink");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should fetch the drink identified by id", async () => {
      const drink = { id: drinkDto.idDrink };
      const id = "a drink";

      spyFetch.mockImplementationOnce(
        async () =>
          new MockedResponse({
            ok: true,
            status: 200,
            response: { drinks: [drinkDto] },
          })
      );

      spyMap.mockImplementationOnce(() => drink);

      expect(await DrinksResource.Instance.getDrinkById(id)).toBe(drink);
      expect(spyFetch).toHaveBeenCalledTimes(1);
      expect(spyFetch).toHaveBeenCalledWith(
        `${DrinksResource.Instance.apiEndpoint}/lookup.php?i=${id}`
      );
      expect(spyMap).toHaveBeenCalledTimes(1);
      expect(spyMap).toHaveBeenCalledWith(drinkDto);
    });
  });

  describe("getRandomDrink", () => {
    let spyFetch: SpyInstance;
    let spyMap: SpyInstance;

    beforeEach(() => {
      spyFetch = vi.spyOn(DrinksResource.Instance, "fetch");
      spyMap = vi.spyOn(DrinksResource.Instance, "mapDrink");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should fetch a single random drink", async () => {
      const drink = { id: drinkDto.idDrink };

      spyFetch.mockImplementationOnce(
        async () =>
          new MockedResponse({
            ok: true,
            status: 200,
            response: { drinks: [drinkDto, anotherDrinkDto] },
          })
      );

      spyMap.mockImplementationOnce(() => drink);

      expect(await DrinksResource.Instance.getRandomDrink()).toBe(drink);
      expect(spyFetch).toHaveBeenCalledTimes(1);
      expect(spyFetch).toHaveBeenCalledWith(
        `${DrinksResource.Instance.apiEndpoint}/random.php`
      );
      expect(spyMap).toHaveBeenCalledTimes(1);
      expect(spyMap).toHaveBeenCalledWith(drinkDto);
    });
  });
});
