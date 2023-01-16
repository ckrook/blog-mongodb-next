import Link from "next/link";
import React, { useEffect } from "react";
import { getUsers } from "../hooks/users";
import { convertNewDateToString } from "../lib/helpers";

export default function SearchInput() {
  const [search, setSearch] = React.useState("");
  const [dropdown, setDropdown] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [usersReults, setUsersResults] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  function getPosts() {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }

  function getUsers() {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersResults(data);
      });
  }

  console.log(results);

  useEffect(() => {
    if (search.length > 0) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, [search]);

  useEffect(() => {
    if (dropdown) {
      getPosts();
      getUsers();
    }
  }, [dropdown]);

  useEffect(() => {
    let posts = results.filter((result: any) => {
      return result.title.toLowerCase().includes(search.toLowerCase());
    });
    let users = usersReults.filter((user: any) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(users);
    setFilteredPosts(posts);
  }, [search]);

  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="bg-stone-100 ml-5 border-gray-100 rounded-full  w-96" />
      {dropdown && (
        <div className="absolute top-0 mt-20 ml-14 px-2 py-4 bg-white w-96 rounded-lg shadow-md">
          <div className="flex flex-col gap-2 p-4">
            {filteredPosts.length > 0 ? <div className="uppercase font-medium">Posts</div> : <></>}
            {filteredPosts.map((post: any) => (
              <Link href={`/post/${post._id}`}>
                <div className="flex items-center gap-2">
                  <img src="https://lh3.googleusercontent.com/a/AEdFTp5RhnShx4VRzrKCk11-NHrhkJDMvSYeL7rcVghgLw=s96-c" alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-0">
                    <div className="flex gap-2 text-gray-600">
                      <p className="">{post.author.name}</p>
                      <span>·</span>
                      <p>{convertNewDateToString(post.published)}</p>
                    </div>
                    <p className="font-bold text-lg">{post.title}</p>
                  </div>
                </div>
              </Link>
            ))}
            <br />
            <hr />
            {filteredUsers.length > 0 ? <div className="uppercase font-medium">Users</div> : <></>}
            {filteredUsers.map((user: any) => (
              <Link href={`/user/${user._id}`}>
                <div className="flex items-center gap-2">
                  <img src="https://lh3.googleusercontent.com/a/AEdFTp5RhnShx4VRzrKCk11-NHrhkJDMvSYeL7rcVghgLw=s96-c" alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-0">
                    <div className="flex gap-2 text-gray-600">
                      <p className="">{user.name}</p>
                      <p>{user.created}</p>
                    </div>
                    <p className="font-bold text-lg">{user.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
