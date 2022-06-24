import { handleSingleDrinkResponse } from "./helpers/handleSingleDrinkResponse";
import { throwErrorIfFails } from "./helpers/throwErrorIfFails";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;

export class DrinksResource {
  apiEndpoint: string;

  static _instance: DrinksResource;

  private constructor() {
    const headers = new Headers();
    headers.append("Content-Type", `${CONTENT_TYPE}`);

    this.apiEndpoint = API_ENDPOINT;
  }

  public async getRandomDrink() {
    const url = `${this.apiEndpoint}/random.php`;
    const response = await fetch(url);
    await throwErrorIfFails(response);
    return handleSingleDrinkResponse(response);
  }

  public async getThreeRandomDrinks() {
    return Promise.all([
      this.getRandomDrink(),
      this.getRandomDrink(),
      this.getRandomDrink(),
    ]);
  }

  public static get Instance(): DrinksResource {
    return this._instance || (this._instance = new this());
  }
}
