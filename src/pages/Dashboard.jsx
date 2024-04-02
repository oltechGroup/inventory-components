import { useEffect, useState } from "react";
import { instance } from "../api/instance";
import { BarChart, AreaChart, Badge } from "keep-react";
import { Cube } from "phosphor-react";
import { SkeletonCharts } from "../components/SkeletonCharts";

function Dashboard() {
  const [stadistics, setStadistics] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStadicstics = () => {
    instance
      .get("/componentes/stadistics")
      .then((response) => {
        setStadistics(response.data);
      })
      .finally(() => setLoading(false));
  };

  const barChartData = stadistics.arrayCountByCategory?.map((item) => ({
    name: item.category,
    cantidad: parseInt(item.sum),
  }));

  const chartData = stadistics.stadisticsInventory?.map((item) => ({
    name: item.tipo_movimiento,
    sell: parseInt(item.quantity),
  }));

  useEffect(() => getStadicstics(), []);

  return (
    <div>
      <div className="flex items-center gap-6">
        <h1>Dashboard</h1>
        <Badge color="secondary">
          {stadistics?.countComponentes?._sum.stock} Componentes Totales
        </Badge>
      </div>

      {loading ? (
        <SkeletonCharts />
      ) : (
        <>
          <Badge className="absolute mt-10">Inventario</Badge>
          <AreaChart
            chartData={chartData}
            dataKey="sell"
            showTooltip={true}
            chartType="natural"
          />

          <section className="flex gap-6 flex-wrap mb-6">
            {stadistics.arrayCountByCategory?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-end shadow-medium p-4 rounded-md border border-cyan-50"
              >
                <div className="flex gap-2">
                  <Cube size={24} />
                  <h3>{item.category}</h3>
                </div>
                <div>
                  <p className="font-bold text-4xl">{item.sum}</p>
                </div>
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
        </>
      )}
    </div>
  );
}

export default Dashboard;
