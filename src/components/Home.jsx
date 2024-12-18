import React from "react";
import SearchContainer from "./subcomps/SearchContainer";
import "../styles/Home.css";

const Home = () => {
  return (
    <section id="home">
      <div className="home-content">
        <div className="home-text">
          <h3>Unleash Your Inner Otaku.</h3>
          <p>
            Dive into the world of anime, discover classics, explore hidden
            gems, and keep track of your favorites.
          </p>
        </div>

        <SearchContainer />
      </div>
    </section>
  );
};

export default Home;
