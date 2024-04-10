"use client";
import BlogEditModal from "@/modals/blog-edit.modal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [createModalOpen, setCreateModalOpened] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const router = useRouter();

  const fetchBlogs = () => {
    fetch("http://localhost:4000/blog", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const blogs = res.data;
        console.log("check data", blogs);
        setBlogList(blogs);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onSignout = () => {
    fetch("http://localhost:4000/auth/signout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      console.log("signed out successfully");
      router.push("/login");
    });
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-screen">
        <div className="text-xl font-bold">Blog App</div>
        <div className="flex flex-row gap-5">
          <button
            onClick={() => {
              setCreateModalOpened(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onSignout();
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="overflow-y-auto overscroll-y-contain p-4 pt-24">
        <div className="flex flex-col justify-center items-center gap-5">
          {blogList.map((item, index) => (
            <div
              key={index}
              className="max-w-3xl w-full bg-white p-4 rounded shadow-md"
            >
              <div className="flex flex-row gap-5">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.content.slice(0, 20)}</p>
                </div>
                <div>
                  <button
                    className="bg-pink-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    onClick={() => {
                      router.push(`/blog/${item._id}`);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BlogEditModal
        opened={createModalOpen}
        setOpened={setCreateModalOpened}
        fetchBlogs={fetchBlogs}
      />
    </>
  );
}
