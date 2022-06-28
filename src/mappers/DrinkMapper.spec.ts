import { describe, it, expect } from "vitest";
import type { DrinkDto } from "../dtos/DrinkDto";
import type { Drink } from "../models/Drink";
import { DrinkMapper } from "./DrinkMapper";

describe("DrinkMapper", () => {
  it("should return expected mapped drink", () => {
    const drinkDto: DrinkDto = {
      idDrink: "DRINK ID",
      strDrink: "DRINK NAME",
      strCategory: "DRINK CATEGORY",
      strAlcoholic: "DRINK ALCOHOLIC",
      strGlass: "DRINK GLASS",
      strInstructions: "DRINK INSTRUCTIONS",
      strDrinkThumb: "DRINK THUMBNAIL",
      strIngredient1: "DRINK INGREDIENT 1",
      strIngredient2: "DRINK INGREDIENT 2",
      strIngredient3: "DRINK INGREDIENT 3",
      strIngredient4: "DRINK INGREDIENT 4",
      strIngredient5: "DRINK INGREDIENT 5",
      strMeasure1: "DRINK MEASURE 1",
      strMeasure2: "DRINK MEASURE 2",
      strMeasure3: "DRINK MEASURE 3",
      strMeasure4: "DRINK MEASURE 4",
      strMeasure5: "DRINK MEASURE 5",
      strCreativeCommonsConfirmed: "DRINK LICENSE",
      dateModified: "DRINK MODIFICATION DATE",
    };

    const expectedDrink: Drink = {
      id: "DRINK ID",
      name: "DRINK NAME",
      glass: "DRINK GLASS",
      instructions: "DRINK INSTRUCTIONS",
      thumbnail: "DRINK THUMBNAIL",
      ingredients: [
        "DRINK INGREDIENT 1",
        "DRINK INGREDIENT 2",
        "DRINK INGREDIENT 3",
        "DRINK INGREDIENT 4",
        "DRINK INGREDIENT 5",
      ],
      measures: [
        "DRINK MEASURE 1",
        "DRINK MEASURE 2",
        "DRINK MEASURE 3",
        "DRINK MEASURE 4",
        "DRINK MEASURE 5",
      ],
    };

    expect(DrinkMapper.toDrink(drinkDto)).toEqual(expectedDrink);
  });
});
