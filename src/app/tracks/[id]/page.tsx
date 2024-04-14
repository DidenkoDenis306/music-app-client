"use client";

import { ITrack } from "@repo/types/track";
import { Box, Button, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useInput } from "@repo/hooks/useInput";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();

  const { data: track, isPending } = useQuery<ITrack>({
    queryKey: ["track"],
    queryFn: () =>
      fetch(`http://localhost:5555/tracks/${id}`).then((res) => res.json()),
  });
  const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(track);

  const { push } = useRouter();

  const username = useInput("");
  const text = useInput("");

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track?._id,
        }
      );

      if (currentTrack) {
        setCurrentTrack({
          ...currentTrack,
          comments: [...currentTrack.comments, response.data],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {track ? (
        <>
          <Button
            variant="outlined"
            sx={{ fontSize: 32 }}
            onClick={() => push("/tracks")}
          >
            To List
          </Button>
          <Grid container sx={{ margin: "20px 0" }}>
            {/* <Image
              src={track.picture}
              alt={track.name}
              width={200}
              height={200}
            /> */}
            <img
              src={`http://localhost:5555/${track.picture}`}
              alt="pict"
              width={200}
              height={200}
            />
            <Box>
              <h1>Track title - {currentTrack?.name}</h1>
              <h1>Artist - {currentTrack?.artist}</h1>
              <h1>Listens - {currentTrack?.listens}</h1>
            </Box>
          </Grid>
          <h1>Lyrics</h1>
          <p>{currentTrack?.text}</p>
          <h1>Comments</h1>
          <Grid container>
            <TextField {...username} label="Your name" fullWidth />
            <TextField
              {...text}
              label="Your comment"
              fullWidth
              multiline
              rows={4}
            />
            <Button onClick={handleAddComment}>Send</Button>
          </Grid>
          <Box>
            {currentTrack?.comments &&
              currentTrack?.comments.map((comment) => (
                <Box>
                  <p>Author - {comment.username}</p>
                  <p>Comment - {comment.text}</p>
                </Box>
              ))}
          </Box>
        </>
      ) : (
        <h1>No track</h1>
      )}
    </>
  );
}
