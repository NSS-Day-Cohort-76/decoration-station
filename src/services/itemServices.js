export const getItems = async () => {
  // return fetch("http://localhost:8088/items").then((res) => res.json());
  const res = await fetch("http://localhost:8088/items");
  return await res.json();
};
