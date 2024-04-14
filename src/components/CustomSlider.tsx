import React, { FC } from "react";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { secondsToMinutes } from "@repo/utils/helpers";

interface Props {
  left: number;
  right: number;
  width: number | string;
  isTimeSlider?: boolean;
  onChange: (event: any, value: number | number[]) => void;
}

export const CustomSlider: FC<Props> = ({
  left,
  right,
  onChange,
  width,
  isTimeSlider,
}) => {
  return (
    <Box position="relative" width={width}>
      <Slider
        sx={{ color: "white", display: "flex" }}
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelFormat={isTimeSlider ? secondsToMinutes : Number}
        valueLabelDisplay="auto"
        min={0}
        size="small"
        max={right}
        value={left}
        onChange={onChange}
      />
      <style>{`
        .MuiSlider-thumb{
          opacity: 0;
          transition: opacity 0.2s;
        }

        .MuiSlider-root:hover .MuiSlider-thumb{
          opacity: 1;
        }
      `}</style>
    </Box>
  );
};
