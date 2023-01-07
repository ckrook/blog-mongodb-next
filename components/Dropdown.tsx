import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();

  function toggleDropdown() {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <>
      <button onClick={() => toggleDropdown()} className={`text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ${isOpen ? "hidden" : "block"}`} type="button">
        Dropdown header
        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div className={`z-10 absolute bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? "block" : "hidden"}`}>
        <div onClick={() => toggleDropdown()} className="px-4 cursor-pointer py-3 text-sm text-gray-900 dark:text-white">
          <div>{session?.user?.name}</div>
          <div className="font-medium truncate">{session?.user?.email}</div>
        </div>
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a onClick={() => signOut()} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </a>
        </div>
      </div>
    </>
  );
}
