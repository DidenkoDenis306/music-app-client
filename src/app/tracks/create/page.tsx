"use client";

import { FileUpload } from "@repo/components/FileUpload";
import { StepWrapper } from "@repo/components/StepWrapper";

import {Box, Button, Grid, TextField} from "@mui/material";
import { useState } from "react";
import { useInput } from "@repo/hooks/useInput";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");

  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();

      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhost:5555/tracks", formData)
        .then((resp) => push("/tracks"))
        .catch((e) => console.log(e));
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" sx={{ padding: 5,    border: '2px solid #d15534' }}>
            <TextField {...name} label="Track name" sx={{ marginTop: 3 }} />
            <TextField {...artist} label="Artist name" sx={{ marginTop: 3 }} />
            <TextField
              {...text}
              label="Track lyrics"
              multiline
              rows={3}
              sx={{ marginTop: 3 }}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container direction="column" sx={{ padding: '20px',
            border: '2px solid #d15534',
            minHeight: '300px',
            maxHeight: '350px',
            objectFit: 'fit',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'}}>
            <FileUpload setFile={setPicture} accept="image/*" >
              <Button>Upload picture</Button>
            </FileUpload>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid container direction="column" sx={{ padding: 20,    border: '2px solid #d15534' }}>
            <FileUpload setFile={setAudio} accept="audio/*">
              <Button>Upload audio</Button>
            </FileUpload>
          </Grid>
        )}
      </StepWrapper>

      <Box sx={{position: 'relative',
                top: '50px'}}>
        <Button disabled={activeStep === 0} onClick={back} sx={{color: '#d15534'}}>
          Back
        </Button>
        <Button onClick={next} sx={{color: '#d15534'}}>Continue</Button>
      </Box>
    </>
  );
}
