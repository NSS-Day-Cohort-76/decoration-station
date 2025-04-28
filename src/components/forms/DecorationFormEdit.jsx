import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSeasons } from "../../services/seasonServices.js";
import { getCategories } from "../../services/categoryServices.js";
import {
  deleteItem,
  getItem,
  updateItem,
} from "../../services/itemServices.js";

export const DecorationFormEdit = () => {
  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    imageUrl: "",
    seasonId: 0,
    categoryId: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getItem(id).then((item) => {
      setUserChoices({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        seasonId: item.seasonId,
        categoryId: item.categoryId,
      });
    });
    getSeasons().then(setSeasons);
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserChoices(() => ({
      ...userChoices,
      [name]: name.includes("Id") ? parseInt(value) : value,
    }));
  };

  const handleSaveDecoration = (e) => {
    e.preventDefault();
    if (
      userChoices.name &&
      userChoices.imageUrl &&
      userChoices.seasonId &&
      userChoices.categoryId
    ) {
      updateItem(userChoices).then(() => {
        navigate(-1);
      });
    } else {
      alert("You missed a field. Lamont you big dummy!");
    }
  };

  const handleDelete = () => {
    deleteItem(userChoices.id).then(() => {
      navigate("/items");
    });
  };

  return (
    <form className="decoration-form">
      <h2 className="decoration-form-title">Add a decoration to the catalog</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Item"
            value={userChoices.name}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image Url:</label>
          <input
            required
            id="imgUrl"
            name="imageUrl"
            type="text"
            className="form-control"
            placeholder="https://www.example.com"
            value={userChoices.imageUrl}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Season:</div>
          <select
            className="filter-box"
            id="select-season"
            name="seasonId"
            value={userChoices.seasonId}
            onChange={handleChange}
          >
            <option key="0" value="0" disabled>
              Select a Season
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
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Category:</div>
          {categories.map((category) => {
            return (
              <div key={category.id} className="radio">
                <label>
                  <input
                    type="radio"
                    name="categoryId"
                    checked={userChoices.categoryId === category.id}
                    value={category.id}
                    onChange={handleChange}
                  />
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <button className="btn" onClick={handleSaveDecoration}>
        Edit Decoration
      </button>
      <button className="btn" onClick={handleDelete}>
        Delete Decoration
      </button>
    </form>
  );
};
