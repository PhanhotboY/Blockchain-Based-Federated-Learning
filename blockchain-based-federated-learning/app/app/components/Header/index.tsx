import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Header() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container flex items-center justify-between p-4 ">
        <h1>Blockchain-based Federated Learning</h1>

        <nav>
          <div className="flex items-center justify-center">
            <div
              className="relative group"
              onMouseEnter={() => setIsOpenDropdown(true)}
              onMouseLeave={() => setIsOpenDropdown(false)}
            >
              <div
                id="dropdown-button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                <Link to="/models" className="mr-2">
                  Models
                </Link>
              </div>

              {isOpenDropdown && (
                <div
                  id="dropdown-menu"
                  className="absolute left-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
                >
                  <Link
                    to="/models/submit"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Submit
                  </Link>
                  <Link
                    to="/models/compare"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    Compare
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
