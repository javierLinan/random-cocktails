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
import { mockDrink } from "../mocks/Drink.mock";

describe("DrinkResource", () => {
  describe("getRandomDrink", () => {
    let spyFetch: SpyInstance;

    beforeEach(() => {
      spyFetch = vi.spyOn(DrinksResource.Instance, "fetch");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should fetch a single random drink", async () => {
      const drink = mockDrink("a drink");
      const anotherDrink = mockDrink("another drink");

      spyFetch.mockImplementationOnce(
        async () =>
          new MockedResponse({
            ok: true,
            status: 200,
            response: { drinks: [drink, anotherDrink] },
          })
      );

      expect(await DrinksResource.Instance.getRandomDrink()).toEqual(drink);
      expect(spyFetch).toHaveBeenCalledTimes(1);
      expect(spyFetch).toHaveBeenCalledWith(
        `${DrinksResource.Instance.apiEndpoint}/random.php`
      );
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
      const drink = mockDrink("a drink");
      const anotherDrink = mockDrink("another drink");
      const aLastDrink = mockDrink("a last drink");

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
