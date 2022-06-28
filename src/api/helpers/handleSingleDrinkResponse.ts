import type { DrinkDto } from "../../dtos/DrinkDto";
import type { ApiResponseDto } from "../../dtos/ApiResponseDto";

export async function handleSingleDrinkResponse(
  response: Response
): Promise<DrinkDto | undefined> {
  if (response.ok) {
    const json = (await response.json()) as ApiResponseDto;
    return json.drinks[0];
  }
}
