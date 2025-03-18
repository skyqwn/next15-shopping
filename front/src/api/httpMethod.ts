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
  // const response = await fetch(`https://cicardi.store/api${uri}`, init);

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}${uri}`,
  //   init,
  // );
  // const response = await fetch(`http://13.125.84.188/api${uri}`, init);

  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  // baseUrl 검증
  if (!baseUrl) {
    console.error("Base URL is not defined:", {
      API_URL: process.env.API_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
    throw new Error("Base URL (API_URL or NEXT_PUBLIC_API_URL) is not defined");
  }

  const fullUrl = `${baseUrl}${uri.startsWith("/") ? "" : "/"}${uri}`;
  console.log("Fetching URL:", fullUrl);

  try {
    const response = await fetch(fullUrl, init);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${uri}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Result:", data);
    return data as ApiResponse<T>;
  } catch (error) {
    console.error("Fetch error:", error);
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
