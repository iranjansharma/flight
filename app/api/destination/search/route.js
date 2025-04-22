// app/api/destination/search/route.js
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing query param" }), {
      status: 400,
    });
  }

  const options = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination",
    params: { query },
    headers: {
      "x-rapidapi-key": "85ac022c2amsh7de1db1affbc5a8p1af7b9jsn766a48974dc9",
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
