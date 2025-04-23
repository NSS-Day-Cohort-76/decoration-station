export const getSeasons = async () => {
  // return fetch("http://localhost:8088/seasons").then((res) => res.json());
  const res = await fetch("http://localhost:8088/seasons");
  return await res.json();
};
