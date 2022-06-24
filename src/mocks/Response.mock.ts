export class MockedResponse implements Response {
  headers!: Headers;
  ok: boolean;
  redirected!: boolean;
  status: number;
  statusText: string;
  type!: ResponseType;
  url!: string;
  response: unknown;
  body!: ReadableStream<Uint8Array>;
  bodyUsed!: boolean;

  constructor({
    ok = true,
    status = 200,
    statusText = "",
    response,
  }: {
    ok?: boolean;
    status?: number;
    response?: unknown;
    statusText?: string;
  }) {
    this.ok = ok;
    this.status = status;
    this.response = response;
    this.statusText = statusText;
  }

  clone(): Response {
    throw new Error("Method not implemented.");
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error("Method not implemented.");
  }

  blob(): Promise<Blob> {
    throw new Error("Method not implemented.");
  }

  formData(): Promise<FormData> {
    throw new Error("Method not implemented.");
  }

  json(): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(this.response);
    });
  }

  text(): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.statusText);
    });
  }
}
