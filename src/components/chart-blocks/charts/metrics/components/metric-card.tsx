import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: "up" | "down";
}

export default function MetricCard({title, value, subtitle, change, changeType}: Props){
  const isUp = changeType === "up";
  const changeColor = isUp ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight;
  
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div className = "text-sm font-medium text-muted-foreground">{title}</div>
      {change && (
        <div className={'flex items-center text-xs font-medium px-2 py-1 rounded-full ${changeColor}'}>
          <ArrowIcon className="w-3 h-3 mr-1" />
          {change}
        </div>
      )}
    </div>
    <div className="mt-2 text-3xl font-bold text-primary">{value}</div>
    {subtitle && (
      <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
    )}
  </div>
  );
}