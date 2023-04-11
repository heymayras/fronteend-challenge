import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { BsStar, BsPeople, BsHeart } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { async } from "q";

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
          <div className={styles.profile_image}>
            <img src={listUser.avatar_url} />
          </div>
          <div className={styles.details_user}>
            <div>
              <p>Developer's Name</p>
              <p>@username</p>
            </div>
            <div>
              <p>{listUser.bio}</p>
            </div>
            <div className={styles.followers_details}>
              <BsPeople />
              <p>{listUser.followers}</p>
              <p>followers</p>
            </div>
            <div className={styles.followers_details}>
              <BsHeart />
              <p>{listUser.following}</p>
              <p>following</p>
            </div>
            <div className={styles.followers_details}>
              <BsStar />
              <p>100</p>
              <p>stars</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
