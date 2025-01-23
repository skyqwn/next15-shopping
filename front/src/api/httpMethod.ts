export function createInit<Body extends object>(
  body?: Body,
  cache: RequestCache = "no-store",
): RequestInit {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
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
    console.log("리졀트", result);
    return result as T;
  } catch (error) {
    console.error(error);
    return undefined as any;
  }
}

export function GET<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "GET", ...init });
}

export function POST<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, { method: "POST", ...init });
}

export function PATCH<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, {
    method: "PATCH",
    ...init,
  });
}

export function DELETE<T>(input: string, init?: RequestInit) {
  return fetchWrapperWithTokenHandler<T>(input, {
    method: "DELETE",
    ...init,
  });
}
