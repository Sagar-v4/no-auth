export const fetcher = async (url: RequestInfo, options?: RequestInit) => {
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const res = await fetch(url, fetchOptions);
    if ([400].includes(res.status)) {
      throw new Error("Unauthorized");
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch: ${url}`);
  }
};
