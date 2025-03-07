import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <img src={product.image} alt={product.name} style={{ width: "100%" }} />
          <Typography variant="h6">{product.name}</Typography>
          <Typography color="textSecondary">{product.price}</Typography>
          <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
