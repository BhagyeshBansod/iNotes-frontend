import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  //useNavigate hook to redirect to specified page
  let navigate = useNavigate();
  const alltabs = [
    {
      path: "/",
      name: "My Notes",
      id: 1
    },
    {
      path: "/about",
      name: "About",
      id: 2
    },
  ];

  const tabs = alltabs.map((tab) => {
    return (
      <Link
        key={tab.id}
        to={tab.path}
        className={`${
          location.pathname === tab.path ? "text-white" : "text-gray-400"
        } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
      >
        {tab.name}
      </Link>
    );
  });

  const credTabs = [
    {
      path: "/login",
      name: "Login",
      id: 3
    },
    {
      path: "/signup",
      name: "Signup",
      id: 4
    },
  ];

  const credtab = credTabs.map((cred, index) => {
    return (
     
        <Link
        key={cred.id}
          to={cred.path}
          className={`${
            cred.name === "Login"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-green-500 hover:bg-green-700"
          } text-white px-4 py-2 rounded-md text-sm font-medium`}
        >
          {cred.name}
        </Link>
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-800 w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {localStorage.getItem("token") ? (
              <>
                <div className="font-bold flex-shrink-0 text-zinc-50">
                  iNotes
                </div>
                <div className="ml-10 flex items-baseline space-x-4">
                  {tabs}
                </div>
                <button
                  type="button"
                  className="hover:bg-red-700 ml-auto flex items-center space-x-4 text-white px-4 py-2 rounded-md text-sm font-medium bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <div className="font-bold flex-shrink-0 text-zinc-50">
                    iNotes
                  </div>
                  <div className="ml-10 flex items-baseline space-x-4">
                    {tabs}
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  {credtab}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
