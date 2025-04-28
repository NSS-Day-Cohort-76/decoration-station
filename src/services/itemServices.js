export const getItems = async () => {
  const res = await fetch("http://localhost:8088/items");
  return await res.json();
};

export const getItem = async (id) => {
  return fetch(`http://localhost:8088/items/${id}`).then((res) => res.json());
};

export const getItemWithDetails = async (id) => {
  return fetch(
    `http://localhost:8088/items/${id}?_expand=season&_expand=category`
  ).then((res) => res.json());
};

export const createItem = (itemObj) => {
  return fetch("http://localhost:8088/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemObj),
  });
};

export const updateItem = (itemObj) => {
  return fetch(`http://localhost:8088/items/${itemObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemObj),
  });
};

export const deleteItem = (id) => {
  return fetch(`http://localhost:8088/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
