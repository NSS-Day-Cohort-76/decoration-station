import { useEffect, useState } from "react";
import { getItems } from "../../services/itemServices.js";
import { getSeasons } from "../../services/seasonServices.js";
import { ItemFilterBar } from "./ItemFilterBar.jsx";
import { useNavigate } from "react-router-dom";

export const ItemList = () => {
  const [items, setItems] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonChoice, setSeasonChoice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getItems().then(setItems);
    getSeasons().then(setSeasons);
  }, []);

  useEffect(() => {
    if (seasonChoice === 0) {
      setFilteredItems(items);
    } else {
      const seasonItems = items.filter(
        (item) => item.seasonId === seasonChoice
      );
      setFilteredItems(seasonItems);
    }
  }, [seasonChoice, items]);

  const navigateToItemDetails = (id) => {
    navigate(`items/${id}`);
  };

  return (
    <>
      <ItemFilterBar
        seasonChoice={seasonChoice}
        setSeasonChoice={setSeasonChoice}
        seasons={seasons}
      />
      <div className="item-container">
        {filteredItems.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="item-img"
                onClick={() => {
                  navigateToItemDetails(item.id);
                }}
              ></img>
              <div className="item-name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
