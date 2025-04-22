import React from "react";
import { useDispatch } from "react-redux";
import BaseLayout from "../Layouts/BaseLayout";
import Threads from "../components/Threads";
import { asyncPopulateThreadsAndUsers } from "../states/shared/sharedThunk";

function HomePage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  return (
    <BaseLayout>
      <Threads />
    </BaseLayout>
  );
}

export default HomePage;
