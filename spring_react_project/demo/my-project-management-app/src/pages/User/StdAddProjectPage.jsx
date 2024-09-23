import React, { useEffect, useState } from "react";
import StdSideBar from "../../components/User/StdSideBar";
import NewNavBar from "../../components/User/NewNavBar";
import StdAddProject from "../../components/User/StdAddProject";

const StdAddProjectPage = () => {

  return (
    <div>
      <NewNavBar />
      <div className="d-flex">
        <StdSideBar />
        <StdAddProject />
      </div>
    </div>
  );
};
export default StdAddProjectPage;
