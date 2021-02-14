export async function fetchJSON<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T | never> {
  const response = await fetch(url, options);

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  throw new Error('Error');
}
