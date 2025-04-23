import { useEffect, useState } from "react";
import "./DecorationStation.css";
import { getItems } from "../services/itemServices.js";
import { getSeasons } from "../services/seasonServices.js";

function DecorationStation() {
  const [items, setItems] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonChoice, setSeasonChoice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

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
      <div id="filter-bar">
        <select
          className="filter-box"
          id="season-select"
          value={seasonChoice}
          onChange={(event) => {
            setSeasonChoice(parseInt(event.target.value));
          }}
        >
          <option key="0" value="0">
            All seasons
          </option>
          {seasons.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="item-container">
        {filteredItems.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <img src={item.imageUrl} alt="" className="item-img"></img>
              <div className="item-name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DecorationStation;
