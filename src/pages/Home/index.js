import React, { useState } from "react";
import styles from "./Home.module.css";
import { Input, InputGroup, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [listUser, setListUser] = useState({});
  const handleSearch = async () => {
    await axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        console.log(response);
        setListUser(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Search Devs</h1>
      </div>
      <div className={styles.search}>
        {" "}
        <InputGroup>
          <Input
            type="text"
            placeholder=" Type the username here..."
            onChange={(e) => setUser(e.target.value)}
          />
          <Button
            onClick={() => [handleSearch(), navigate(`/profile/${user}`)]}
          >
            🔍︎ Buscar
          </Button>
        </InputGroup>
      </div>
    </>
  );
}
