import React, { useEffect, useState } from "react";
import SearchProjectForm from "../../components/User/SearchProjectForm";
import NewNavBar from "../../components/User/NewNavBar";
import LoginNavBar from "../../components/User/LoginNavBar";

const SearchProjectPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็ตโทเคน
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <div>
      {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
      <SearchProjectForm />
    </div>
  );
};

export default SearchProjectPage;
