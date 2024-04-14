"use client";

import { Box, Button } from "@mui/material";
import { useCart } from "@repo/store/cart";

export default function Page() {
  const title = "Pizza";
  const price = 100;

  const { addToCart } = useCart();

  return (
    <Box color="white">
      <h1>{title}</h1>
      <p>{price}</p>
      <button onClick={() => addToCart(title)}>Add to cart</button>
    </Box>
  );
}
