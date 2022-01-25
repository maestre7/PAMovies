import React from "react";
import "./styles.scss";
import Header from "./components/header/header";
// import FilmDetails from "./views/FilmDetails";
import ListSearch from "./views/listSearch/listSearch";
import MainView from "./views/MainView";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./views/Details";
import ListGenres from "./components/ListGenres/listGenres";
import AllGenres from "./components/AllGenres/AllGenres";
import AllPremieres from "./components/AllPremieres/AllPremieres";
import Error404 from "./components/Error404/Error404";
import Footer from "./components/footer/footer";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/details/:type/:id" element={<Details />} />
          <Route path="/" element={<MainView />} />
          <Route exact path="/AllPremieres/" element={<AllPremieres />} />
          <Route exact path="/AllGenres/" element={<AllGenres />} />
          <Route exact path="/Genres/:title/:id" element={<ListGenres />} />
          <Route path="/listSearch" element={<ListSearch />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </main>
  );
}

export default App;
