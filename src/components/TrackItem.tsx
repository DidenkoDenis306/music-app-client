import { ITrack } from "@repo/types/track";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, memo } from "react";
import { usePlayer } from "@repo/store/player";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addApiUrlToPath } from "@repo/utils/helpers";

interface Props {
  track: ITrack;
  active?: boolean;
}

function areEqual(prev: Props, next: Props) {
  return prev.track.id === next.track.id;
}

export const TrackItem: FC<Props> = ({ track }) => {
  const { push } = useRouter();

  const { play, pause, setActiveTrack, activeTrack, isPlaying } = usePlayer();

  console.log("track", track.id);

  const handleCLickPlay = (event: any) => {
    // event.stopPropagation();
    if (isPlaying && track.id === activeTrack?.id) {
      pause();
    } else {
      setActiveTrack(track);
      play();
    }
  };

  const { mutate } = useMutation({
    mutationFn: () => axios.delete(`http://localhost:5555/tracks/${track.id}`),
  });

  const handleDelete = (event: any) => {
    event.stopPropagation();
    mutate();
  };

  return (
    <Box
      onClick={handleCLickPlay}
      // onClick={() => push(`/tracks/${track._id}`)}
      sx={{
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <Box position="relative">
        {/* <Image
          src={`http://localhost:5555/image/ccd6d27d-ee05-4364-9fdb-be422464884f.jpeg`}
          alt={track.name}
          width={70}
          height={70}
        /> */}

        <img
            src={`http://localhost:5555/${track.picture}`}
            alt="pict"
          width={200}
          height={200}
          style={{ borderRadius: "20px" }}
        />

        {activeTrack?.id === track.id && (
          <Box
            position="absolute"
            left={0}
            top={0}
            width={200}
            height={200}
            bgcolor="black"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              opacity: activeTrack?.id === track.id ? 0.5 : 0,
              transition: "opacity 0.3s",
                borderRadius: "20px"
            }}
          >
            <IconButton
              onClick={handleCLickPlay}
              sx={{ color: "white", opacity: 1 }}
            >
              {!isPlaying ? (
                <PlayArrow sx={{ width: 40, height: 40 }} />
              ) : (
                <Pause sx={{ width: 40, height: 40 }} />
              )}
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: 200,
          margin: "0 20px",
        }}
      >
        <Box>
          <Box
            sx={{
              color: "#2b2b2b",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {track.name}
          </Box>
          <Box sx={{ fontSize: 14, color: "#858586" }}>{track.artist}</Box>
        </Box>
      </Box>
      ;
      {/* {active && <Box>02:42 / 03:22</Box>}
      <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton> */}
    </Box>
  );
};
