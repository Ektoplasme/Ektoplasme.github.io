export const fetchCommits = async (token: string) => {
  const url = "https://api.github.com/repos/Ektoplasme/Ektoplasme.github.io/commits";

  const headers: Record<string, string> = token
    ? { Authorization: `token ${token}` }
    : {};

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};