import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

function GoogleSucccess() {
  const { login, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      login(token);
    }

    navigate("/", {
      replace: true,
    });
  }, [location, navigate]);

  console.log(user);
  return <div>מתחבר, רק רגע...</div>;
}

export default GoogleSucccess;
