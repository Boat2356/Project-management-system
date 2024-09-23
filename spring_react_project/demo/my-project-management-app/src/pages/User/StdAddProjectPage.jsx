import React, { useEffect, useState } from "react";
import StdSideBar from "../../components/User/StdSideBar";
import NewNavBar from "../../components/User/NewNavBar";
import StdAddProject from "../../components/User/StdAddProject";
import StdProtectedRoute from '../../components/User/StdProtectedRoute';

const StdAddProjectPage = () => {

  return (
    <div>
      <NewNavBar />
      <StdProtectedRoute>
        <div className="d-flex">
          <StdSideBar />
          <StdAddProject />
        </div>
      </StdProtectedRoute>
    </div>
  );
};
export default StdAddProjectPage;
