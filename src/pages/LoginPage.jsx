import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BaseLayout from "../Layouts/BaseLayout";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <BaseLayout>
      <LoginForm />
    </BaseLayout>
  );
}

export default LoginPage;
