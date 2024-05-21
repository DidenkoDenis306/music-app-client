"use client";

import { Box, Typography } from "@mui/material";
import { FC, ReactNode, useRef, useState } from "react";
import Image from 'next/image';

interface Props {
  setFile: Function;
  accept: string;
  children: ReactNode;
}

export const FileUpload: FC<Props> = ({ setFile, accept, children }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setFileName(file.name);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  return (
      <Box >
        <Box
            onClick={() => ref.current?.click()}
            sx={{
              cursor: "pointer",
              border: "1px dashed grey",
              padding: 2,
              textAlign: "center",

            }}
        >
          <input
              type="file"
              accept={accept}
              style={{ display: "none" }}
              ref={ref}
              onChange={onChange}
          />
          {children}
        </Box >
        {filePreview && (
            <Box m={2}>
                <Image
                    src={filePreview}
                    alt="Picture Preview"
                    layout="fill"
                    objectFit="contain"

                />
            </Box>
        )}
        {fileName && !filePreview && (
            <Typography variant="body1" mt={2}>
              Selected file: {fileName}
            </Typography>
        )}
      </Box>
  );
};