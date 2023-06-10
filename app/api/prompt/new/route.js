import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// API route for creating a new prompt
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try{
    // Connect to the database
    await connectToDatabase(); 

    const newPrompt = new Prompt({
      creator: userId,
      prompt, 
      tag
    })
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 201}); 
  } catch(error){
    return new Response("Error creating prompt", {status: 500});
  }
};
