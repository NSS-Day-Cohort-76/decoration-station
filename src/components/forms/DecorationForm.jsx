import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryServices.js";
import { createItem, getItems } from "../../services/itemServices.js";

export const DecorationForm = ({
  seasons,
  setUserChoices,
  userChoices,
  setItems,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
    // getCategories().then(categories => {
    //   setCategories(categories)
    // })
  }, []);

  // Refactoring change saves to userChoices state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserChoices(() => ({
      ...userChoices,
      [name]: name.includes("Id") ? parseInt(value) : value,
    }));
  };

  const handleSaveDecoration = (e) => {
    e.preventDefault();
    // Error check
    if (
      userChoices.name &&
      userChoices.imageUrl &&
      userChoices.seasonId &&
      userChoices.categoryId
    ) {
      // post to the database
      createItem(userChoices).then(() => {
        getItems().then(setItems);
        // reset state
        setUserChoices({
          name: "",
          imageUrl: "",
          seasonId: 0,
          categoryId: 0,
        });
        // alert submit
        alert("Decoration created!");
      });
    } else {
      alert("You missed a field. Lamont you big dummy!");
    }
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
            // onChange={(event) => {
            //   const copy = { ...userChoices };
            //   copy.name = event.target.value;
            //   setUserChoices(copy);
            // }}
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
            // onChange={(event) => {
            //   const copy = { ...userChoices };
            //   copy.imageUrl = event.target.value;
            //   setUserChoices(copy);
            // }}
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
            // onChange={(event) => {
            //   const copy = { ...userChoices };
            //   copy.seasonId = parseInt(event.target.value);
            //   setUserChoices(copy);
            // }}
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
                    // onChange={(event) => {
                    //   const copy = { ...userChoices };
                    //   copy.categoryId = parseInt(event.target.value);
                    //   setUserChoices(copy);
                    // }}
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
        Add Decoration
      </button>
    </form>
  );
};
