"use client";

import { Box } from "@mui/material";
import { useCart } from "@repo/store/cart";

export default function Page() {
  const { cart } = useCart();

  return (
    <Box color="white">
      <h1>Cart page</h1>

      {cart && cart.map((item) => <p>item</p>)}
    </Box>
  );
}
