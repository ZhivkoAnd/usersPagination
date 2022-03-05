import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // On click fetches the next page and appends it to the current one.
  // We set the data by combining the previous array with the new one, coming from the next page
  const fetchUsers = () => {
    const fetchData = async (pagenumber) => {
      const result = await fetch(
        `https://randomuser.me/api?page=${pagenumber}`
      );
      // dont execute if there is no data, so if the pages are over
      if (result === undefined) return;
      const nextResult = await result.json();
      setData((data) => [...data, ...nextResult.results]);
      setPageNumber(nextResult.info.page + 1);
    };
    fetchData(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      {data &&
        data.map((item) => {
          return (
            <div key={item.email}>
              <div>{item.gender}</div>
              <img src={item.picture.thumbnail} alt={item.picture.thumbnail} />
            </div>
          );
        })}
      <button onClick={fetchUsers}>Fetch Users</button>
    </div>
  );
};

export default App;
