import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./components/Home";
import AnimeDisplayPage from "./components/AnimeDisplayPage";
import Watchlist from "./components/Watchlist";
import "./App.css";
import TopLists from "./components/TopLists";
import TopAnimes from "./components/TopAnimes";
import TopMangas from "./components/TopMangas";
import TopChars from "./components/TopChars";
import TopPeople from "./components/TopPeople";
import E404 from "./components/E404";

const App = () => {
  const isSearchActive = useMatch("/search/:animeName");
  const isWatchlistActive = useMatch("/watchlist");

  const fcNeeded = isSearchActive || isWatchlistActive;

  return (
    <Layout>
      <main className={fcNeeded ? "fit-content" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:animeName" element={<AnimeDisplayPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/top-lists" element={<TopLists />} />
          <Route path="/top-animes" element={<TopAnimes />} />
          <Route path="/top-mangas" element={<TopMangas />} />
          <Route path="/top-characters" element={<TopChars />} />
          <Route path="/top-people" element={<TopPeople />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
