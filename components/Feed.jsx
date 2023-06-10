"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { set } from "mongoose";

// Component List of Prompt Cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Handle search
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(e.target.value);
        setFilteredPosts(searchResults);
      }, 500)
    );
  };

  // Handle tag click
  // Shows all posts with the same clicked tag
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResults = filterTags(tag);
    setFilteredPosts(searchResults);
  };

  // Filter posts by search text
  // Search text can be username, prompt, or tag
  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  };

  // Filter posts by tag
  const filterTags = (searchTag) => {
    const regex = new RegExp(searchTag, "i");
    return posts.filter((post) => regex.test(post.tag));
  };

  useEffect(() => {
    // fetch posts from api
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
