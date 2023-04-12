import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  BsStar,
  BsPeople,
  BsHeart,
  BsDot,
  BsBuilding,
  BsLink45Deg,
} from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function formatDate(dateString) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "long" });
  const date = Date.parse(dateString);
  const currentDate = Date.now();
  const diffInMs = currentDate - date;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return rtf.format(-Math.ceil(diffInDays), "day");
}

export function Profile() {
  const navigate = useNavigate();
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
              const reposSorted = res.data.sort((a, b) => {
                if (a.stargazers_count < b.stargazers_count) return 1;
                if (a.stargazers_count > b.stargazers_count) return -1;
                return 0;
              });
              setRepos(reposSorted);
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
          <div className={styles.contatos}>
            <p>
              {" "}
              <BsBuilding /> {listUser.company}
            </p>
            <p>
              <GoLocation /> {listUser.location}
            </p>
            <p>
              <HiOutlineMail /> {listUser.email}
            </p>
            <p>
              {" "}
              <BsLink45Deg /> {listUser.blog}
            </p>
            <p>
              <FiTwitter /> {listUser.twitter_username}
            </p>
          </div>
          <div className={styles.checkout}>
            {" "}
            <Button onClick={() => [navigate(`/`)]}>Sair</Button>
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
                    <BsStar /> {repo.stargazers_count} <BsDot /> Updated{" "}
                    {formatDate(repo.updated_at)}
                  </p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
