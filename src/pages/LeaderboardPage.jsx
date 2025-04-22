import React from "react";
import { useDispatch } from "react-redux";
import BaseLayout from "../Layouts/BaseLayout";
import Leaderboard from "../components/Leaderboard";
import { asyncReceiveLeaderboards } from "../states/leaderboards/leaderboardsThunk";

function LeaderboardPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <BaseLayout>
      <Leaderboard />
    </BaseLayout>
  );
}

export default LeaderboardPage;
