import React from "react";
import { useEffect } from "react";
import Nav from "./nav/nav";
import Search from "./nav/search";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [bars, setBars] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    if (width <= 550) {
      setMobile(true);
    } else {
      setBars(true);
      setMobile(false);
    }

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, [width]);

  function screenChange() {
    const icon = bars ? (
      <>
        <FontAwesomeIcon icon={faBars} onClick={handleClick}></FontAwesomeIcon>
      </>
    ) : (
      <>
        <FontAwesomeIcon icon={faTimes} onClick={handleClick}></FontAwesomeIcon>
        <Nav></Nav>
      </>
    );
    return icon;
  }
  function handleClick() {
    setBars(!bars);
  }

  return (
    <>
      <header className="header">
        <div className="container-header">
          <p className="logo" onClick={() => navigate("/")}>
            logo
          </p>
          <div className="faBars">
            {mobile ? (
              screenChange()
            ) : (
              <>
                <Nav></Nav>
                <Search className="search"></Search>
              </>
            )}
          </div>
        </div>
        {mobile ? <Search></Search> : null}
      </header>
    </>
  );
}
