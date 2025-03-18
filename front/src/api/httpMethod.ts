export function createInit<Body extends object | FormData>(
  body?: Body,
  cache: RequestCache = "no-store",
): RequestInit {
  const headers: Record<string, string> = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    credentials: "include",
    body: body instanceof FormData ? body : JSON.stringify(body),
    cache,
  };
}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string;
}

async function fetchWrapperWithTokenHandler<T>(
  uri: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  let apiUrl: string;

  if (process.env.NODE_ENV === "production") {
    apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  } else {
    apiUrl = "http://localhost:4000/api";
  }

  const response = await fetch(`${apiUrl}${uri}`, init);

  try {
    if (!response.ok)
      throw new Error(`Failed to fetch ${uri}: ${response.statusText}`);
    const data = await response.json();
    console.log("리절트", data);
    return data as ApiResponse<T>;
  } catch (error) {
    console.log("에러에러에러", error);
    return { success: false, result: null as T, message: "Fetch failed" };
  }
}

export function GET<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "GET", ...init });
}

export function POST<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "POST", ...init });
}

export function PATCH<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "PATCH", ...init });
}

export function DELETE<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "DELETE", ...init });
}
