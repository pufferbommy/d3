import { CONFIGS_API_URL } from "@/app/constants";

export async function GET(_, { params }) {
  const { configId } = await params;

  try {
    const response = await fetch(CONFIGS_API_URL);
    const { data } = await response.json();
    
    const config = data.find(d => d.drone_id === Number(configId));
    
    if (!config) {
      return Response.json({ error: "Config not found" }, { status: 404 });
    }
  
    return Response.json({ drone_id: config.drone_id, drone_name: config.drone_name, light: config.light, country: config.country, weight: config.weight });
  } catch(error) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}