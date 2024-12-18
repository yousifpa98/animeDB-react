import React from "react";
import TopListCard from "./subcomps/TopListCard";
import "../styles/TopLists.css"

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
    </div>
  );
};

export default TopLists;
