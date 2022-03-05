import "./App.css";
import { useEffect, useState } from "react";

// function App() {
//   const [nextPage, setNextPage] = useState(1);
//   const [randomUserData, setRandomUserData] = useState("");

//   const fetchNextUser = async () => {
//     const result = await fetch(`https://randomuser.me/api?page=${nextPage}`);
//     const data = await result.json();

//     const newData = data.results;

//     setData(newData);
//     setNextPage(data.info.page + 1);
//   };

//   useEffect(() => {
//     fetchNextUser();
//   }, []);

const App = () => {
  const [userInfos, setUserInfos] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    const fetchRandomData = async (pageNumber) => {
      const data = await fetch(`https://randomuser.me/api?page=${pageNumber}`);
      const randomData = await data.json();
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      console.log(randomData);
      setNextPageNumber(randomData.info.page + 1);
    };
    fetchRandomData();
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
              <div key={user.id}>
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
