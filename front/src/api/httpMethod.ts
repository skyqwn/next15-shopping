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

async function fetchWrapperWithTokenHandler<T>(
  uri: string,
  init?: RequestInit,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${uri}`,
    init,
  );

  try {
    const { result } = await response.json();
    return result as T;
  } catch (error) {
    console.error(error);
    return { success: false, result: [], message: "Fetch failed" } as T;
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
