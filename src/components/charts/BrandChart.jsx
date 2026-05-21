import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { useProductsStore } from "../../stores/productsStore.js";

const COLORS = [
  "#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd",
  "#818cf8", "#4f46e5", "#7c3aed", "#9333ea",
];

export default function BrandChart() {
  const products = useProductsStore((s) => s.products);

  const data = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      if (p.brand) counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }, [products]);

  if (data.length === 0) return null;

  return (
    <div className="card chart-card">
      <div className="card__label">PRODUCTS BY BRAND</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -20, bottom: 60 }}
          aria-label="Bar chart showing product count per brand"
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            angle={-40}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              fontSize: 12,
            }}
            cursor={{ fill: "var(--surface-2)" }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
