import type { DrinkDto } from "../dtos/DrinkDto";

export const mockDrink = (id: string): DrinkDto =>
  ({
    idDrink: id,
  } as DrinkDto);
