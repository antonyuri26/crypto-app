import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NewsCard from "./NewsCard";
import Progress from "./Progress";

const News = () => {
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsHandler = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.gagarin.news/api/news?page=1&per_page=9&sort=-date",
          {
            method: "GET",

            headers: {
              "access-control-allow-methods": "GET, POST, OPTIONS",
              "access-control-allow-origin": "https://gagarin.news",
              "Content-Type": "application/json",
              "access-control-expose-headers": "Content-Length,Content-Range",
              "access-control-allow-headers":
                "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
              "access-control-expose-headers": "Content-Length,Content-Range",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const newsData = await response.json();

        const recentNews = newsData.data.map((news) => {
          return {
            id: news.content[0].key,
            date: new Date(news.date).toLocaleString(),
            title: news.h1,
            description: news.preview,
            image: news.image,
            url: "https://gagarin.news/news/" + news.slug,
          };
        });

        console.log(recentNews);

        setNews(recentNews);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchNewsHandler();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        paddingTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id="news"
    >
      <Typography variant="h4" mb="2rem" sx={{ color: "text.terciary" }}>
        Crypto News
      </Typography>
      {isLoading ? (
        <Progress />
      ) : (
        <Container
          maxWidth="xl"
          sx={{ backgroundColor: "primary.main", mb: "3rem" }}
        >
          <Grid container spacing={4}>
            {news.map((post) => (
              <NewsCard key={post.title} post={post} />
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default News;
