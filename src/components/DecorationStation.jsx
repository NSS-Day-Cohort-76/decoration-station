import { useEffect, useState } from "react";
import "./DecorationStation.css";
import { getItems } from "../services/itemServices.js";
import { getSeasons } from "../services/seasonServices.js";
import { DecorationForm } from "./forms/DecorationForm.jsx";
import { ItemFilterBar } from "./item/ItemFilterBar.jsx";
import { ItemList } from "./item/ItemList.jsx";

function DecorationStation() {
  const [items, setItems] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonChoice, setSeasonChoice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    imageUrl: "",
    seasonId: 0,
    categoryId: 0,
  });

  useEffect(() => {
    getItems().then((items) => {
      setItems(items);
    });
  }, []);

  useEffect(() => {
    getSeasons().then(setSeasons);
  }, []);

  useEffect(() => {
    // seasonChoice = 0
    if (seasonChoice === 0) {
      // set filteredItems to items
      setFilteredItems(items);
    } else {
      // seasonChoice > 0
      // set filteredItems to the filtered items
      const seasonItems = items.filter(
        (item) => item.seasonId === seasonChoice
      );
      setFilteredItems(seasonItems);
    }
  }, [seasonChoice, items]);

  return (
    <>
      <ItemFilterBar
        seasonChoice={seasonChoice}
        setSeasonChoice={setSeasonChoice}
        seasons={seasons}
      />
      <DecorationForm
        seasons={seasons}
        setUserChoices={setUserChoices}
        userChoices={userChoices}
        setItems={setItems}
      />
      <ItemList filteredItems={filteredItems} />
    </>
  );
}

export default DecorationStation;
