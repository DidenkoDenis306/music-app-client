import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  left: number;
  right: number;
  onChange: (event: any) => void;
}

export const TrackProgress: FC<Props> = ({ left, right, onChange }) => {
  return (
    <Box display="flex" className="range-wrapper">
      <input
        type="range"
        width="100px"
        className="range-input"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <style>
        {`.range-input-container {
            display: flex;
            align-items: center;
          }

          .range-input {
            // -webkit-appearance: none;
            background: red;
            width: 100%;
            margin: 10px 0;
          }

        

          .range-input::-webkit-slider-runnable-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            background: #c7c7c7;
            border-radius: 1.3px;
          }

          .range-input::-webkit-slider-thumb {
            box-shadow: 0px 0px 0px #000000;
            border: 0px solid #000000;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #red;
            opacity: 0;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -4px;
          }

          .range-input:hover::-webkit-slider-thumb {
            opacity: 1;
          }
}`}
      </style>
    </Box>
  );
};
