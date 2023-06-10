import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET prompt
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found.", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch.", { status: 500 });
  }
};
// Patch prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    // Find prompt by id
    const oldPrompt = await Prompt.findById(params.id);
    if (!oldPrompt) return new Response("Prompt not found.", { status: 404 });
    // Update prompt
    oldPrompt.prompt = prompt;
    oldPrompt.tag = tag;
    // Save prompt
    await oldPrompt.save();
    return new Response(JSON.stringify(oldPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update.", { status: 500 });
  }
};
// DELETE prompt
export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted.", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete.", { status: 500 });
  }
}