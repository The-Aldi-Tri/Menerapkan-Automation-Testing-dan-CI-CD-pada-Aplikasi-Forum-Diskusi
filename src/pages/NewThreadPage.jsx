import React from "react";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import NewThreadForm from "../components/NewThreadForm";

function NewThreadPage() {
  return (
    <ProtectedLayout>
      <NewThreadForm />
    </ProtectedLayout>
  );
}

export default NewThreadPage;
