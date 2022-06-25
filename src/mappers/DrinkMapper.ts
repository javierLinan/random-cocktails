import type { DrinkDto } from "../dtos/DrinkDto";
import type { Drink } from "../models/Drink";

export class DrinkMapper {
  public static toDrink(drinkDto: DrinkDto): Drink {
    const ingredients: string[] = [];

    for (const index of Array(15).keys()) {
      const key = `strIngredient${index}` as keyof DrinkDto;
      const ingredient = drinkDto[key];

      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return {
      id: drinkDto.idDrink,
      name: drinkDto.strDrink,
      thumbnail: drinkDto.strDrinkThumb,
      ingredients,
    };
  }
}
