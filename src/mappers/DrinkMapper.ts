import type { DrinkDto } from "../dtos/DrinkDto";
import type { Drink } from "../models/Drink";

export class DrinkMapper {
  public static toDrink(drinkDto: DrinkDto): Drink {
    const ingredients: string[] = [];
    const measures: string[] = [];

    for (const index of Array(15).keys()) {
      const ingredientKey = `strIngredient${index}` as keyof DrinkDto;
      const ingredient = drinkDto[ingredientKey];
      const measureKey = `strMeasure${index}` as keyof DrinkDto;
      const measure = drinkDto[measureKey];

      if (ingredient) {
        ingredients.push(ingredient.trim());
      }

      if (measure) {
        measures.push(measure.trim());
      }
    }

    return {
      id: drinkDto.idDrink,
      name: drinkDto.strDrink.trim(),
      thumbnail: drinkDto.strDrinkThumb,
      instructions: drinkDto.strInstructions.trim(),
      glass: drinkDto.strGlass.trim(),
      ingredients,
      measures,
    };
  }
}
