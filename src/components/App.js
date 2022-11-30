import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import api from "../utils/api";
import CatsList from "./CatsList";
import NavBar from "./NavBar";

export default function App() {
  const [onLoad, setOnLoad] = useState(false);
  const [cats, setCats] = useState([]);
  const [countPage, setCountPage] = useState(1);
  const { pathname } = useLocation();

  // Use local storage to save your favorite cats
  const [favoriteCats, setFavoriteCats] = useState(
    JSON.parse(localStorage.getItem("cats")) || []
  );
  const navigate = useNavigate();


  // Get cats from api
  useEffect(() => {
    navigate("/");
    api
      .getData()
      .then((data) => {
        setCats(data);
        setOnLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);

  // The likes handler
  function handleOnLike(selectedCat) {
    // Проверяем, есть ли этот кот среди любимых
    const isLiked = favoriteCats.some((c) => c.id === selectedCat.id);
    // Добавляем, если его нет
    !isLiked && setFavoriteCats([selectedCat, ...favoriteCats]);
  }

  // The dislikes handler
  function handleOnDislike(selectedCat) {
    setFavoriteCats((state) => state.filter((c) => c.id !== selectedCat.id));
  }

  // Save favorite cats to local storage
  useEffect(() => {
    localStorage.setItem("cats", JSON.stringify(favoriteCats));
  }, [favoriteCats]);

  // adding cats to page
  async function addMoreData(page) {
    await api
      .addMoreData(countPage)
      .then((moreCats) => {
        setCats((cats) => cats.concat(moreCats));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    countPage > 1 && pathname === "/" && addMoreData(countPage);
  }, [countPage]);

  async function handleCount() {
    setCountPage((state) => state + 1);
  }

  // Infinite scroll
  function checkPosition() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;
    if (position >= threshold) {
      handleCount();
    }
  }

  function throttle(callee, timeout) {
    let timer = null;
    return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
        callee(...args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", throttle(checkPosition, 1000));
    window.addEventListener("resize", throttle(checkPosition, 1000));
    return () => {
      window.addEventListener("scroll", null);
      window.addEventListener("resize", null);
    };
  }, []);

  return onLoad ? (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <CatsList
                cats={cats}
                onLikeClick={handleOnLike}
                isLiked={false}
              />
            }
          />
          <Route
            path="/favorite-cats"
            element={
              <CatsList
                cats={favoriteCats}
                onLikeClick={handleOnDislike}
                isLiked={true}
              />
            }
          />
        </Routes>
      </main>
    </>
  ) : (
    <p>Загружаем котиков...</p>
  );
}
