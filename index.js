const express = require("express");
const app = express();

app.use(express.json());

let movieList = [
  {
    id: "1",
    name: "End Game",
    totalMovieTime: "189 mins",
    poster: "Day la poster End Game",
    trailer: "youtube.com/trailer/End-game",
  },
  {
    id: "2",
    name: "Spider Man",
    totalMovieTime: "120 mins",
    poster: "Day la poster Spider Man",
    trailer: "youtube.com/trailer/Spider-Man",
  },
];

app.get("/api/movies", (req, res) => {
  res.status(200).send(movieList);
});

app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieDetail = movieList.find((movie) => (movie.id = id));
  if (movieDetail) {
    res.status(200).send(movieDetail);
  } else {
    res.status(404).send("Not Found");
  }
});

app.post("/api/movies", (req, res) => {
  const { name, totalMovieTime, poster, trailer } = req.body;
  const newMovie = {
    id: Math.random().toString(),
    name,
    totalMovieTime,
    poster,
    trailer,
  };
  movieList = [...movieList, newMovie];
  res.status(200).send(newMovie);
});

app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const index = movieList.findIndex((movie) => movie.id == id);
  if (index !== -1) {
    const movieRemove = movieList[index];
    movieList.splice(index, 1);
    res.status(200).send(movieRemove);
  } else {
    res.status(404).send("Not Found");
  }
});

app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const { name, totalMovieTime, poster, trailer } = req.body;
  const index = movieList.findIndex((movie) => movie.id == id);
  if (index !== -1) {
    let movieUpdate = movieList[index];
    movieUpdate = { ...movieUpdate, name, totalMovieTime, poster, trailer };
    movieList[index] = movieUpdate;
    res.status(200).send(movieUpdate);
  } else {
    res.status(404).send("Not Found");
  }
});

const port = 7000;
app.listen(port, () => {
  console.log(`app run on port ${port}`);
});
