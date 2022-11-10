import { React, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  ButtonBase,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Search() {
  useEffect(() => {
    results && results.length > 0 && (
      <div>
        {results.map((item) => {
          <div key={item._id}>
            <div>
              <p>{item.companyName}</p>
            </div>
          </div>;
        })}
      </div>
    );
  });

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const recommendations = () => {
    console.log(`reco: ${search}`);
    axios
      .post("http://localhost:4000/search", { key: search })
      .then((res) => setResults(res.data))
      .then(console.log(results));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Recomendations</h1>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField item label="Search" onChange={handleSearch}></TextField>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <Button onClick={recommendations} variant="contained">
            Search
          </Button>
        </Grid>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            boxShadow: 20,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          {results.map((item) => (
            <Grid container spacing={5}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={item.image} />
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">
                  {item.headline}
                </Typography>
                <Typography color="text.secondary">
                  {item.primaryText}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      </Grid>
    </>
  );
}

export default Search;
