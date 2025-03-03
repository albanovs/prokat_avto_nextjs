export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Метод не разрешен" }), { status: 405 });
  }

  const response = await fetch("http://78.36.203.128:50500/api/v1/tokens/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: "USER_FOR_SITE",
      PasswordHash: "f7f8e967f2756082ada759e8e189e772e00a1deb13583e9beee02ad9a5420fda5ce2069e942cdc22a8cae4ecb90ace005737c6c96dd655330f0f1ae6a0ffd8fc",
      LongToken: true,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Ошибка авторизации" }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}