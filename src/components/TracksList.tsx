import { ITrack } from "@repo/types/track";
import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { TrackItem } from "./TrackItem";

interface Props {
  tracks: ITrack[];
}

export const TrackList: FC<Props> = ({ tracks }) => {
  console.log(tracks);
  return (
    <Box display="flex" flexWrap="wrap">
      {tracks.map((track) => (
        <TrackItem key={track._id} track={track} />
      ))}
    </Box>
  );
};
