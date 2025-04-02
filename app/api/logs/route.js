import { LOGS_API_URL } from "@/app/constants";

export async function POST(request) {
  const res = await request.json()
  try {
    const response = await fetch(LOGS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": "Bearer 20250301efx" },
      body: JSON.stringify(res),
    });
    const result = await response.json();
    return Response.json(result, {
      status: 201
    });
  } catch (error) {
    return Response.json({ error: "Failed to create data" }, { status: 500 });
  }
}