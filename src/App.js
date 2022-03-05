import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [userInfos, setUserInfos] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    const fetchRandomData = async (pageNumber) => {
      const result = await fetch(
        `https://randomuser.me/api?page=${pageNumber}`
      );
      const data = await result.json();
      // userInfos is empty at this point
      console.log(userInfos);
      console.log(data.results);
      const newUserInfos = [...userInfos, ...data.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(data.info.page + 1);
    };
    fetchRandomData(nextPageNumber);
  };

  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
      <div>
        {userInfos &&
          userInfos.map((user) => {
            return (
              <div key={user.email}>
                <div>{user.gender}</div>
                <img src={user.picture?.thumbnail} alt="hey" />
              </div>
            );
          })}
      </div>
      <button onClick={fetchNextUser}>Fetch next user</button>
    </div>
  );
};

export default App;
