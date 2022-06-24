import type { DrinkDto } from "../../dtos/DrinkDto";

export async function handleSingleDrinkResponse(
  response: Response
): Promise<DrinkDto> {
  const json = (await response.json()) as { drinks: DrinkDto[] };
  return json.drinks[0];
}
