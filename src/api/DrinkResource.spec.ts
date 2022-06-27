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
import type { Drink } from "../models/Drink";

describe("DrinkResource", () => {
  let drinkDto: DrinkDto;
  let anotherDrinkDto: DrinkDto;
  let aLastDrinkDto: DrinkDto;

  beforeEach(() => {
    drinkDto = { idDrink: "a drink" } as DrinkDto;
    anotherDrinkDto = { idDrink: "another drink" } as DrinkDto;
    aLastDrinkDto = { idDrink: "a last drink" } as DrinkDto;
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

  describe("getThreeRandomDrinks", () => {
    let spyGetRandomDrink: SpyInstance;

    beforeEach(() => {
      spyGetRandomDrink = vi.spyOn(DrinksResource.Instance, "getRandomDrink");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should fetch three random drink", async () => {
      const drink = { id: "a drink" } as Drink;
      const anotherDrink = { id: "another drink" } as Drink;
      const aLastDrink = { id: "a last drink" } as Drink;

      spyGetRandomDrink
        .mockImplementationOnce(
          async () =>
            new Promise((resolve) => {
              resolve(drink);
            })
        )
        .mockImplementationOnce(
          async () =>
            new Promise((resolve) => {
              resolve(anotherDrink);
            })
        )
        .mockImplementationOnce(
          async () =>
            new Promise((resolve) => {
              resolve(aLastDrink);
            })
        );

      expect(await DrinksResource.Instance.getThreeRandomDrinks()).toEqual([
        drink,
        anotherDrink,
        aLastDrink,
      ]);
      expect(spyGetRandomDrink).toHaveBeenCalledTimes(3);
    });
  });
});
