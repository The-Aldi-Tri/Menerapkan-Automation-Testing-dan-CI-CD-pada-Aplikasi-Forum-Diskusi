import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BaseLayout from "../Layouts/BaseLayout";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <BaseLayout>
      <RegisterForm />
    </BaseLayout>
  );
}

export default RegisterPage;
