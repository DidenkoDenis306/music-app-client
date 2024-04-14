"use client";

import { Box } from "@mui/material";
import { FC, ReactNode, useRef } from "react";

interface Props {
  setFile: Function;
  accept: string;

  children: ReactNode;
}

export const FileUpload: FC<Props> = ({ setFile, accept, children }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Box onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />

      {children}
    </Box>
  );
};
