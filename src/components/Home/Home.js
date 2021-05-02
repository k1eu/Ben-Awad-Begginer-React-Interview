import styles from "./Home.module.scss";
import { useState, useEffect } from "react";

const Home = () => {
  const [number, setNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1)
  const addOne = () => {
    setNumber(number + 1);
  };
  const axios = require("axios");

  const getRandomUser = () => {
    axios
      .get(`https://randomuser.me/api?page=${page}`)
      .then((res) => {
        console.log(res.data.results);
        setUsers(oldUsers => [...oldUsers,...res.data.results]);
        setPage(page + 1)
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  return (
    <main>
      <h1>Hello world {page}</h1>
      <div className={styles.counter}>
        <button onClick={addOne}>+1</button>
        <span>{number}</span>
      </div>
      <div>
        <button onClick={getRandomUser}>Load More Users</button>
        {users && (
          <div className={styles.person}>
            {users.map((user,inx) => (
              <div key={inx}>
                <img src={user.picture.thumbnail} />
                <span>{user.name.title}</span>
                <span> {user.name.first}</span>
                <span> {user.name.last}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
