import { InternalServerError } from "../errors/InternalServerError";
import { ServiceUnavailableError } from "../errors/ServiceUnavailableError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";

export async function throwErrorIfFails(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();

    if (response.status === 500) {
      throw new InternalServerError();
    }
    if (response.status === 503) {
      throw new ServiceUnavailableError();
    }
    if (response.status === 401) {
      throw new UnauthorizedError();
    }
    if (response.status === 403) {
      throw new ForbiddenError();
    }

    throw new Error(errorText);
  }
}
