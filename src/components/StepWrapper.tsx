import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  activeStep: number;
  children: ReactNode;
}

const steps = ["Info about track", "Upload picture", "Upload track"];

export const StepWrapper: FC<Props> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        sx={{ margin: "70px 0", height: 270 }}
      >
        <Card sx={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};
