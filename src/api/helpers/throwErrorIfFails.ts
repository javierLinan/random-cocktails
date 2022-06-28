import { InternalServerError } from "../errors/InternalServerError";
import { ServiceUnavailableError } from "../errors/ServiceUnavailableError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";

export async function throwErrorIfFails(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();

    if (response.status === 500) {
      throw new InternalServerError(errorText);
    }
    if (response.status === 503) {
      throw new ServiceUnavailableError(errorText);
    }
    if (response.status === 401) {
      throw new UnauthorizedError(errorText);
    }
    if (response.status === 403) {
      throw new ForbiddenError(errorText);
    }

    throw new Error(errorText);
  }
}
