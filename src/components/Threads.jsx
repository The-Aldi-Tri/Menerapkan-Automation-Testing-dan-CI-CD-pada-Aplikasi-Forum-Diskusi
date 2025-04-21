import { Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ThreadItem from "./ThreadItem";

function Threads() {
  const threads = useSelector((states) => states.threads);
  const [keyword, setKeyword] = React.useState("");

  const categoryCount = threads.reduce((acc, thread) => {
    acc[thread.category] = (acc[thread.category] || 0) + 1;
    return acc;
  }, {});
  const sortedCategoriesByCount = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  const filteredThreads = threads.filter(
    (thread) => thread.category === keyword,
  );
  const activeThreads = keyword ? filteredThreads : threads;

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight="normal">
          Kategori Populer
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ overflowX: "auto" }}>
          {sortedCategoriesByCount.map((category) => (
            <Chip
              key={category}
              label={`#${category}`}
              variant={keyword === category ? "filled" : "outlined"}
              color={keyword === category ? "primary" : "white"}
              clickable
              onClick={() =>
                keyword === category ? setKeyword("") : setKeyword(category)
              }
              sx={{ width: "fit-content" }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="medium" sx={{ pt: 2 }}>
          Diskusi Tersedia
        </Typography>
        {activeThreads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </Stack>
    </Stack>
  );
}

export default Threads;
