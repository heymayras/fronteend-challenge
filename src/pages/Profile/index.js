import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { BsStar, BsPeople, BsHeart, BsDot } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Profile() {
  const { user } = useParams();
  const [listUser, setListUser] = useState({});
  const [repos, setRepos] = useState([]);
  console.log(user);
  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://api.github.com/users/${user}`)
        .then(async (response) => {
          console.log(response);
          setListUser(response.data);

          await axios
            .get(`https://api.github.com/users/${user}/repos`)
            .then((res) => {
              console.log(res.data);
              setRepos(res.data);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    };
    data();
  }, []);

  async function data() {
    await axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        console.log(response);
        setListUser(response.data);
      })
      .catch((e) => console.log(e));
  }
  data();

  return (
    <>
      <div className={styles.sidebar_container}>
        <div className={styles.sidebar}>
          <img src={listUser.avatar_url} />

          <div className={styles.details_user}>
            <div>
              <h3>{listUser.name}</h3>
              <p>@{listUser.login}</p>
            </div>
          </div>
          <div className={styles.biografia}>
            <p>{listUser.bio}</p>
          </div>
          <div className={styles.followers_details}>
            <BsPeople />
            <p>{listUser.followers}</p>
            <p>followers</p>
            <BsHeart />
            <p>{listUser.following}</p>
            <p>following</p>
            <BsStar />
            <p>0</p>
            <p>stars</p>
          </div>
        </div>
      </div>
      <div className={styles.listaRepos}>
        {repos &&
          repos.map((repo) => {
            console.log(repo);

            return (
              <>
                <div className={styles.dadosRepos}>
                  <a href={repo.html_url}>
                    <h2>{repo.full_name}</h2>
                  </a>
                  <h3> {repo.description}</h3>
                  <p>
                    <BsStar /> {repo.stargazers_count} <BsDot />{" "}
                    {repo.updated_at}
                  </p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
