import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import { headers } from "next/headers";

//API route for fetching all prompts
export const GET = async (req) => {
  const headersList = headers();
  const referer = headersList.get("referer");
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        referer: referer,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch.", { status: 500 });
  }
};
