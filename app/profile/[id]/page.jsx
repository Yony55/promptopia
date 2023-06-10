"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

// UserPage component
const UserPage = ({params}) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get('name');

  // Fetch posts by user id
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      if (params?.id) setPosts(data);
    };
    fetchPosts();
  }, [params?.id]);
  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s profile page!`}
      data={posts}
    />
  )
}

export default UserPage