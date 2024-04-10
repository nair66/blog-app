"use client";
import React, { useEffect, useState } from "react";

export default function Blog({ params }) {
  const [title, setTitle] = useState("Loading..");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/blog/${params.blog_id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data[0];
        const { title, content } = data;
        setTitle(title);
        setContent(content);
        console.log("check data", data);
      });
  }, []);

  return (
    <>
      <h1 className="text-7xl mb-20">{title}</h1>
      <p className="text-xl mb-20">{content}</p>
    </>
  );
}
