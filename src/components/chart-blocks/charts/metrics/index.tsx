import MetricCard from "./components/metric-card";

export default function DashboardMetrics() {
  const data = [
  {
    title: "Total Levies Collected",
    value: "$32,500",
    subtitle: "Compare to last month",
    change: "+5%",
    changeType: "up",
  },
  {
    title: "Pending Maintenance Requests",
    value: "15",
    subtitle: "Compare to last month",
    change: "-3",
    changeType: "down",
  },
  {
    title: "Committee Members",
    value: "3",
    subtitle: "As of April 2025",
  },
];

return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {data.map((item,index) => (
      <MetricCard
        key={index}
        title={item.title}
        value={item.value}
        subtitle={item.subtitle}
        change={item.change}
      />
    ))}
  </div>
);
}
