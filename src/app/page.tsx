import Navbar from "@repo/components/Navbar";
import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="150px"
        color="white"
      >
        <h1>Welcome!</h1>
        <h3>Here is a best tracks</h3>
        <Button>Click me</Button>
      </Box>
    </>
  );
}
