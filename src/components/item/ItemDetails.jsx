import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemWithDetails } from "../../services/itemServices.js";

export const ItemDetails = () => {
  const [item, setItem] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getItemWithDetails(id).then(setItem);
  }, [id]);

  return (
    <>
      <div className="item-detail-container">
        <h3 className="item-detail-name">Item details for {item?.name}</h3>
        <img src={item?.imageUrl} alt={item?.name} className="item-img" />
        <div className="item-details">Category: {item?.category?.name}</div>
        <div className="item-details">Season: {item?.season?.name}</div>
        <div className="btn-group">
          <button
            className="btn-edit"
            onClick={() => {
              navigate("edit");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

// Need Edit button takes us to the edit form
// Edit form should be prefilled with item details
// Need button to save changes, then make a PUT request
// Navigate to ItemDetails (rerenders)
