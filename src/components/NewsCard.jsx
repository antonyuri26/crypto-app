import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

const NewsCard = (props) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex", height: "300px" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {props.post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {props.post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 180, display: { xs: "inline", sm: "block" } }}
            image={props.post.image}
            alt={props.post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default NewsCard;
