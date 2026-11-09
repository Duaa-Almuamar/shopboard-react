// The only file that calls fetch. To test a state, add a switch to BASE_URL:
// ".../delay/3000" (slow), ".../fail/500" (error) or ".../empty" (no products)
const BASE_URL = "https://shopboard-api.vercel.app";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// The body is returned as unknown: the caller checks its shape before using it
export async function fetchJson(path: string): Promise<unknown> {
  const res = await fetch(BASE_URL + path);

  if (!res.ok) {
    throw new ApiError(res.status, "Request failed");
  }

  const body: unknown = await res.json();
  return body;
}
