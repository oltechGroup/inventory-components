import { useEffect, useState } from "react";
import { instance } from "../api/instance";
import { BarChart, AreaChart, Badge } from "keep-react";

function Dashboard() {
  const [stadistics, setStadistics] = useState([]);

  const getStadicstics = () => {
    instance.get("/componentes/statistics").then((response) => {
      setStadistics(response.data);
    });
  };

  const barChartData = stadistics.countComponetesByCategory?.map((item) => ({
    name: item.category,
    cantidad: parseInt(item.count),
  }));

  const chartData = stadistics.stadisticsInventory?.map((item) => ({
    name: item.tipo_movimiento,
    sell: parseInt(item.quantity),
  }));


  console.log(stadistics);
  useEffect(() => getStadicstics(), []);

  return (
    <div>
      <div className="flex items-center gap-6">
        <h1>Dashboard</h1>
        <Badge color="secondary">
          {stadistics?.countComponents?.count} Componentes Totales
        </Badge>
      </div>

      <AreaChart chartData={chartData} dataKey="sell" />

      <section className="flex gap-6 flex-wrap mb-6">
        {stadistics.countComponetesByCategory?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-end shadow-medium p-4 rounded-md border border-cyan-50"
          >
            <h3>{item.category}</h3>
            <p className="font-bold text-4xl">{item.count}</p>
          </div>
        ))}
      </section>

      <BarChart
        height={300}
        width={700}
        barSize={30}
        barRadius={[4, 4, 0, 0]}
        dataKey="cantidad"
        chartData={barChartData}
        showBg={true}
        showLegend={true}
        showTooltip={true}
        showXaxis={true}
        showYaxis={true}
      />
    </div>
  );
}

export default Dashboard;
