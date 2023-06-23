import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 }, { "Cache-Control":
    "no-cache, no-store, max-age=0, must-revalidate"});
  } catch (error) {
    return new Response("Failed to fetch.", { status: 500 });
  }
};
