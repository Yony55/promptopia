// Page component which contains a form to create a prompt
"use client"

// Import hooks
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// Import components
import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter(); 
  const { data: session } = useSession(); 
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

// API call to create a prompt
const createPrompt = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const response = await fetch('api/prompt/new',
    {
      method: 'POST',
      body: JSON.stringify({
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      }),
    })
    if(response.ok) {
      router.push('/');
    }
  } catch (error) {
    console.log(error);
  } finally{ 
     setSubmitting(false);
  }
}

  return (
    // Pass in props to Form component
    <Form
      type="Post"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt