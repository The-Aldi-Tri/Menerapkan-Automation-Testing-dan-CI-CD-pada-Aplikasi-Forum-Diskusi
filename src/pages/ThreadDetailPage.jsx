import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import BaseLayout from "../Layouts/BaseLayout";
import ThreadDetail from "../components/ThreadDetail";
import { asyncReceiveThreadDetail } from "../states/threadDetail/threadDetailThunk";

function ThreadDetailPage() {
  const dispatch = useDispatch();

  const { threadId } = useParams();

  React.useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  return (
    <BaseLayout>
      <ThreadDetail />
    </BaseLayout>
  );
}

export default ThreadDetailPage;
