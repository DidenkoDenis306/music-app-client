"use client";

import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import {Box, IconButton} from "@mui/material";
import {FC, useEffect} from "react";
import {usePlayer} from "@repo/store/player";
import {CustomSlider} from "./CustomSlider";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

let audio: HTMLAudioElement;

export const Player: FC = () => {
  const {
    pause,
    play,
    isPlaying,
    activeTrack,
    duration,
    currentTime,
    volume,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = usePlayer();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
      audio.play();
    }
  }, [activeTrack]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const setAudio = () => {
    if (activeTrack) {
      audio.src = "http://localhost:5555/" + activeTrack.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const handleCLickPlayOrPauseButton = () => {
    if (isPlaying) {
      pause();
      audio.pause();
    } else {
      play();
      audio.play();
    }
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(event.target.value) / 100;
    setVolume(Number(event.target.value));
  };

  const handleChangeCurrentTime = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: number | number[]
  ) => {
    audio.currentTime = Number(newValue);
    setCurrentTime(Number(newValue));
  };

  if (!activeTrack) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 10000000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <img
          src={`http://localhost:5555/${activeTrack.picture}`}
          alt="pict"
          width={40}
          height={40}
          style={{ border: "1px solid white", borderRadius: "8px" }}
        />

        <Box width={100}>
          <Box color="white" fontSize={12} fontWeight={600}>
            {activeTrack?.name}
          </Box>
          <Box sx={{ fontSize: 10, color: "gray" }}>{activeTrack?.artist}</Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        // justifyContent="flex-end"
        alignItems="center"
        width="100%"
        sx={{ margin: "0 20px", color: "white" }}
      >
        <Box display="flex">
          <IconButton sx={{ color: "white" }}>
            <ShuffleIcon sx={{ height: 15 }} />
          </IconButton>

          <IconButton sx={{ color: "white" }}>
            <SkipPreviousIcon sx={{ height: 18 }} />
          </IconButton>

          <IconButton
            onClick={handleCLickPlayOrPauseButton}
            sx={{ color: "white" }}
          >
            {!isPlaying ? <PlayArrow /> : <Pause />}
          </IconButton>

          <IconButton sx={{ color: "white" }}>
            <SkipNextIcon sx={{ height: 18 }} />
          </IconButton>

          <IconButton sx={{ color: "white" }}>
            <RepeatIcon sx={{ height: 15 }} />
          </IconButton>
        </Box>

        <CustomSlider
          width="60%"
          left={currentTime}
          right={duration}
          onChange={handleChangeCurrentTime}
          isTimeSlider
        />
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton sx={{ color: "white" }}>
          <PlaylistPlayIcon sx={{ height: 18 }} />
        </IconButton>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ color: "white" }}>
            <VolumeUp sx={{ height: 18 }} />
          </IconButton>
          <Box display="flex" alignItems="flex-start">
            <CustomSlider
              width={60}
              left={volume}
              right={100}
              onChange={handleChangeVolume}
            />
          </Box>
        </Box>
        <IconButton sx={{ color: "white" }}>
          <FullscreenIcon sx={{ height: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
