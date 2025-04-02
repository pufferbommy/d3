import { LOGS_API_URL } from "@/app/constants";

export async function GET(_, { params }) {
  const { configId } = await params;
  
  try {
    const response = await fetch(`${LOGS_API_URL}?filter=(drone_id='${configId}')&sort=-created&perPage=25`);
    const { items } = await response.json()
    return Response.json(
      items.map(i => ({
        drone_id: i.drone_id,
        drone_name: i.drone_name,
        created: i.created,
        country: i.country,
        celsius: i.celsius,
      }))
    );
  } catch (error) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}