"use client";

import { TrackList } from "@repo/components/TracksList";
import { ITrack } from "@repo/types/track";
import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { push } = useRouter();

  const { data: tracks, isPending } = useQuery({
    queryKey: ["tracks"],
    queryFn: () =>
      fetch("http://localhost:5555/tracks").then((res) => res.json()),
  });

  return (
    <>
      {isPending ? (
        <CircularProgress />
      ) : (
        <Grid container justifyContent="center">
          {/* <Card style={{ width: 1500 }}> */}

          <TrackList tracks={tracks} />
          {/* </Card> */}
        </Grid>
      )}
    </>
  );
}
