import React from "react";

export default function CardAvatar({ user, posts }: any) {
  return (
    <div className="flex flex-col p-10 items-center text-center bg-white text-lg">
      <img src={user.image} alt={user.name} className="rounded-full w-20 h-20 mb-5 mr-4" />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className=" text-gray-500">{user.email}</p>
        <p>Written blogposts: {posts.length}</p>
      </div>
    </div>
  );
}
