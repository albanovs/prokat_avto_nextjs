import { cookies } from "next/headers";

export async function POST() {
  try {
    const response = await fetch("http://78.36.203.128:50500/api/v1/tokens/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserName: "USER_FOR_SITE",
        PasswordHash: "f7f8e967f2756082ada759e8e189e772e00a1deb13583e9beee02ad9a5420fda5ce2069e942cdc22a8cae4ecb90ace005737c6c96dd655330f0f1ae6a0ffd8fc",
        LongToken: true
      }),
    });

    const data = await response.json();
    console.log("Ответ от сервера:", data);

    if (!response.ok) {
      return Response.json({ error: "Ошибка запроса" }, { status: response.status });
    }

    if (data?.AccessToken) {
      console.log("Сохраняем токен в cookies:", data.AccessToken);

      cookies().set("authToken", data.AccessToken, {
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 10,
      });

      console.log("Cookies после установки:", cookies().getAll());
      return Response.json({ success: true });
    }

    return Response.json({ error: "Ошибка получения токена" }, { status: 400 });
  } catch (error) {
    console.error("Ошибка сети:", error);
    return Response.json({ error: "Ошибка сети" }, { status: 500 });
  }
}


export async function GET() {
  const token = cookies().get("authToken")?.value;

  if (!token) {
    return Response.json({ error: "Токен не найден" }, { status: 401 });
  }

  return Response.json({ token });
}
