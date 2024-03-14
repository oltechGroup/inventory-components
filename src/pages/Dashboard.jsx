import { useEffect, useState } from "react";
import { instance } from "../api/instance";

function Dashboard() {
  const [stadistics, setStadistics] = useState([]);

  const getStadicstics = () => {
    instance.get("/componentes/statistics").then((response) => {
      setStadistics(response.data);
    });
  };

  console.log(stadistics);
  useEffect(() => getStadicstics(), []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex gap-4">
        <h3 className="font-bold">Componentes Totales:</h3>
        <p>{stadistics?.countComponents?.count}</p>
      </div>
      {stadistics?.countComponetesByCategory?.map((item, index) => (
        <div key={index} className="flex gap-4">
          <h3 className="font-bold">{item.category}:</h3>
          <p>{item.count}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
