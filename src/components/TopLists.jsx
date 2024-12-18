import React from "react";
import TopListCard from "./subcomps/TopListCard";
import "../styles/TopLists.css";
import Top100List from "./subcomps/Top100List";
import TopAnimes from "./TopAnimes";
import TopMangas from "./TopMangas";

const TopLists = () => {
  const lists = [
    { id: "list1", name: "Anime", to: "/top-animes" },
    { id: "list2", name: "Manga", to: "/top-mangas" },
    { id: "list3", name: "Characters", to: "/top-characters" },
    { id: "list4", name: "People", to: "/top-people" },
  ];

  return (
    <div className="topLists">
      {lists.map((list) => (
        <TopListCard list={list} key={list.id} />
      ))}
     {/*  <TopAnimes /> */}
     {/*  <TopMangas /> */}
    </div>
  );
};

export default TopLists;
