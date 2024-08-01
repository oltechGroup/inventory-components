import { useEffect, useState } from "react";
import { instance } from "../api/instance";
import { Badge } from "keep-react";
import { AreaChartComponent } from "../components/AreaChartComponent";
import TableInventaryGeneral from "../components/TableInventaryGeneral";
import SkeletonDashboard from "../components/SkeletonDashboard";

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
      <div className="flex items-center gap-6 mb-6">
        <h1>Dashboard</h1>
        <Badge color="secondary" className="dark:bg-metal-800 dark:text-white">
          {stadistics?.countComponentes?._sum.stock} Componentes Totales
        </Badge>
      </div>

      {loading ? (
        <SkeletonDashboard />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8 p-4 rounded-2xl bg-metal-900">
            <AreaChartComponent />
          </div>

          <div className="col-span-12 lg:col-span-4 p-4 rounded-2xl bg-metal-900"></div>

          <div className="col-span-12 lg:col-span-12 rounded-2xl bg-metal-900">
            <TableInventaryGeneral />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
