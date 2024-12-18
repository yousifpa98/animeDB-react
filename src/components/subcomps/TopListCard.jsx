import React from "react";
import topAnimesPic from "../../assets/topAnimes.png";
import topCharsPic from "../../assets/topChars.png";
import topMangasPic from "../../assets/topMangas.png";
import topPeoplePic from "../../assets/topPeople.png";
import "../../styles/TopListCard.css";
import { NavLink } from "react-router-dom";

const TopListCard = (props) => {
  const images = {
    Anime: topAnimesPic,
    Manga: topMangasPic,
    Characters: topCharsPic,
    People: topPeoplePic,
  };
  const copies = {
    Anime:
      "Discover the top 100 anime that shaped generations and captured hearts worldwide.",
    Manga:
      "Explore the finest manga masterpieces that defined storytelling and art.",
    Characters:
      "Meet the most iconic and beloved characters who brought stories to life.",
    People:
      "Get to know the creators and visionaries who shaped the anime and manga world.",
  };

  return (
    <div className="topListCard">
      <img src={images[props.list.name] || ""} alt={props.list.name} />
      <div className="listInfo">
        <h3>{props.list.name}</h3>
        <p>{copies[props.list.name]}</p>
        <NavLink className="topListCardLink" to={props.list.to}>
          Go to list
        </NavLink>
      </div>
    </div>
  );
};

export default TopListCard;
