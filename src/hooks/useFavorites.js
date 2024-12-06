import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return favorites;
};

export default useFavorites;
