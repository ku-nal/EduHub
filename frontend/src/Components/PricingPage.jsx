/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./NavBar";

const PricingPage = () => {
  const BACKEND_URL = "https://eduhub-node-backend.onrender.com";
  const handlePayment = async (productDetails) => {
    const stripe = await loadStripe(String(import.meta.env.VITE_PUBLIC_KEY));

    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      product: productDetails,
    };

    const response = await fetch(BACKEND_URL + "/api/create-checkout-session", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const { session = {} } = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // eslint-disable-next-line no-console
      console.log(result.error);
    }
  };

  return (
    <div>
      <Navbar
        pages={["Courses Dashboard", "Community Forum", "Blogs", "Pricing"]}
      />
      <Grid container spacing={2} justifyContent="center" marginTop={4}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                <CheckMark /> Custom domain for your website
              </Typography>
              <Typography variant="h5" color="textSecondary">
                <CheckMark /> Stripe payment gateway
              </Typography>
              <Typography variant="h5" color="textSecondary">
                <CheckMark /> Host 3 live sessions at the same time
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: "20px" }} xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <PricingBox
                title="Basic"
                amount="399"
                sale="10% sale"
                description="Best choice to start your business"
                color="#007bff"
                handlePayment={handlePayment}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PricingBox
                title="Pro"
                amount="1099"
                sale="3% sale"
                description="Best for established creators"
                color="#28a745"
                handlePayment={handlePayment}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const CheckMark = () => (
  <Typography variant="body1" component="span" color="primary">
    ✓
  </Typography>
);

const PricingBox = ({
  title,
  amount,
  sale,
  description,
  color,
  handlePayment,
}) => (
  <Paper
    sx={{
      padding: 4,
      backgroundColor: "#fff",
      borderColor: color,
      borderWidth: 2,
      borderStyle: "solid",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <Typography variant="h5" align="center" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h3" align="center" gutterBottom>
      {amount}
    </Typography>
    <Typography
      variant="body1"
      align="center"
      color="textSecondary"
      gutterBottom
    >
      {sale}
    </Typography>
    <Typography variant="body1" align="center" gutterBottom>
      {description}
    </Typography>
    <Button
      variant="contained"
      fullWidth
      color="primary"
      style={{ backgroundColor: color }}
      onClick={() =>
        handlePayment([
          {
            title,
            amount,
            sale,
            description,
          },
        ])
      }
    >
      Buy now
    </Button>
  </Paper>
);

export default PricingPage;
