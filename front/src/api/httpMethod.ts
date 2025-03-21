export function createInit<Body extends object | FormData>(
  body?: Body,
  cache: RequestCache = "default",
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
  // const apiUrl =
  //   process.env.NEXT_PUBLIC_API_URL || "https://www.cicardi.store/api";
  // const response = await fetch(`${apiUrl}${uri}`, init);

  const baseUrl =
    typeof window === "undefined"
      ? (
          process.env.NEXT_PUBLIC_API_URL || "https://www.cicardi.store/api"
        ).replace("https://www.cicardi.store/api", "http://server:4000/api")
      : process.env.NEXT_PUBLIC_API_URL || "https://www.cicardi.store/api";

  if (!baseUrl) {
    console.error("Base URL is not defined:", {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
    throw new Error("Base URL (NEXT_PUBLIC_API_URL) is not defined");
  }

  const fullUrl = `${baseUrl}${uri.startsWith("/") ? "" : "/"}${uri}`;
  console.log("Fetching URL:", fullUrl);

  try {
    const response = await fetch(fullUrl, init);
    if (!response.ok)
      throw new Error(`Failed to fetch ${uri}: ${response.statusText}`);
    const data = await response.json();
    // console.log("리절트", data);
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
