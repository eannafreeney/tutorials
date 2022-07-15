import React, { useState, useEffect, useRef } from "react";

import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const MAIN_URL = `https://api.unsplash.com/photos/`;
const SEARCH_URL = `https://api.unsplash.com/search/photos/`;

const CLIENT_ID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam, setSearchParam] = useState(searchTerm);
  // needToFetchshouldFetchImages
  const [shouldFetchImages, setShouldFetchImages] = useState(false); //todo
  const mounted = useRef(false); //todo

  // todo. page === 1 & search = empty
  const fetchData = async () => {
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${searchTerm}`;

    setLoading(true);

    if (searchTerm) {
      url = `${SEARCH_URL}${CLIENT_ID}${urlPage}${urlQuery}`;
    } else {
      url = `${MAIN_URL}${CLIENT_ID}${urlPage}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      // searchTerm = '' page == 1

      setPhotos((oldPhotos) => {
        if (searchTerm && page === 1) {
          // when we've just  typed smth in search and didn't scroll page = 1
          return data.results; // removing all old photos -> and then putting new
        } else if (searchTerm) {
          // there is something in search & page not first
          return [...oldPhotos, ...data.results];
        } else {
          // scrolling down & there is nothing in search
          return [...oldPhotos, ...data];
        }
      });

      setShouldFetchImages(false);
      setLoading(false);
    } catch (error) {
      // error?
      setShouldFetchImages(false);
      setLoading(false);
      console.log(error);
    }
  };

  // Call this code on scrolll
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (loading) {
      return;
    }

    if (!shouldFetchImages) {
      return;
    }

    setPage((oldPage) => oldPage + 1);
  }, [shouldFetchImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setShouldFetchImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [searchParam]);

  useEffect(() => {
    fetchData();
  }, [page, searchParam]); // page is the same, searchParam has changed

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParam(searchTerm);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image) => {
            const { id } = image;
            //  <Photo key={id} image={image} />
            return <Photo key={id} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  );
}

export default App;
