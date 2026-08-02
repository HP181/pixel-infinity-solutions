"use client";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_COLORS = { Confirmed: "#22c55e", Rejected: "#ef4444", Pending: "#f59e0b" };
const PALETTE = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#14b8a6"];

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border p-4 dark:border-gray-700">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        {subtitle && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function InsightCard({ icon, label, value, note, accent }) {
  return (
    <div className={`rounded-xl border p-4 dark:border-gray-700 flex items-start gap-3 ${accent ?? ""}`}>
      <span className="text-xl mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5 truncate">{value}</p>
        {note && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{note}</p>}
      </div>
    </div>
  );
}

export default function DashboardCharts({ appointments }) {
  const total = appointments.length;

  if (total === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-5 py-16 text-center text-gray-400 dark:text-gray-600">
        No appointment data to analyze yet.
      </div>
    );
  }

  // ── Core counts ────────────────────────────────────────────────
  const confirmed = appointments.filter((a) => a.status === "confirm").length;
  const rejected = appointments.filter((a) => a.status === "reject").length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const verified = appointments.filter((a) => a.isVerifiedByAdmin).length;

  const confirmRate = Math.round((confirmed / total) * 100);
  const actionRate = Math.round((verified / total) * 100);

  const now = new Date();
  const upcoming = appointments.filter((a) => new Date(a.date) >= now).length;

  // ── Status donut ───────────────────────────────────────────────
  const statusData = [
    { name: "Confirmed", value: confirmed },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ].filter((d) => d.value > 0);

  // ── Monthly stacked breakdown ──────────────────────────────────
  const monthlyMap = {};
  appointments.forEach((a) => {
    const d = new Date(a.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
    if (!monthlyMap[key])
      monthlyMap[key] = { month: label, confirm: 0, reject: 0, pending: 0, total: 0 };
    const s = a.status === "confirm" ? "confirm" : a.status === "reject" ? "reject" : "pending";
    monthlyMap[key][s]++;
    monthlyMap[key].total++;
  });
  const monthlyData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);

  const peakMonth = monthlyData.reduce(
    (max, m) => (m.total > (max?.total ?? 0) ? m : max),
    null
  );
  const lastTwo = monthlyData.slice(-2);
  const momDelta =
    lastTwo.length === 2 ? lastTwo[1].total - lastTwo[0].total : null;

  // ── Day of week ────────────────────────────────────────────────
  const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayMap = Object.fromEntries(DAY_ORDER.map((d) => [d, 0]));
  appointments.forEach((a) => {
    const day = new Date(a.date).toLocaleString("en-US", { weekday: "short" });
    if (day in dayMap) dayMap[day]++;
  });
  const dayData = DAY_ORDER.map((d) => ({ day: d, count: dayMap[d] }));
  const busiestDay = dayData.reduce((max, d) => (d.count > max.count ? d : max), dayData[0]);

  // ── Email domain distribution ──────────────────────────────────
  const domainMap = {};
  appointments.forEach((a) => {
    const domain = a.email.split("@")[1]?.toLowerCase() ?? "unknown";
    domainMap[domain] = (domainMap[domain] || 0) + 1;
  });
  const domainData = Object.entries(domainMap)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ── Subject frequency ──────────────────────────────────────────
  const subjectMap = {};
  appointments.forEach((a) => {
    const key = a.subject.length > 20 ? a.subject.slice(0, 20) + "…" : a.subject;
    subjectMap[key] = (subjectMap[key] || 0) + 1;
  });
  const subjectData = Object.entries(subjectMap)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const topSubject = subjectData[0];

  // ── KPI cards ──────────────────────────────────────────────────
  const kpiCards = [
    {
      label: "Total Bookings",
      value: total,
      sub: `${upcoming} upcoming · ${total - upcoming} past`,
      bg: "bg-indigo-500",
    },
    {
      label: "Confirmation Rate",
      value: `${confirmRate}%`,
      sub: `${confirmed} confirmed of ${total}`,
      bg: confirmRate >= 50 ? "bg-green-500" : "bg-amber-500",
    },
    {
      label: "Awaiting Review",
      value: pending,
      sub: pending > 0 ? "Needs admin action" : "All caught up",
      bg: pending > 0 ? "bg-red-500" : "bg-green-500",
    },
    {
      label: "Admin Action Rate",
      value: `${actionRate}%`,
      sub: `${verified} of ${total} reviewed`,
      bg: "bg-violet-500",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-5 pt-6 space-y-6 pb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpiCards.map((c) => (
          <div key={c.label} className={`rounded-xl p-4 text-white shadow-sm ${c.bg}`}>
            <p className="text-xs font-medium uppercase tracking-wide opacity-80">{c.label}</p>
            <p className="text-4xl font-bold mt-1">{c.value}</p>
            <p className="text-xs mt-1 opacity-75">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Insight Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          icon="📅"
          label="Peak Booking Month"
          value={peakMonth ? `${peakMonth.month} — ${peakMonth.total} bookings` : "—"}
          note={
            momDelta !== null
              ? `${momDelta >= 0 ? "▲" : "▼"} ${Math.abs(momDelta)} vs prior month`
              : "Not enough data for trend"
          }
        />
        <InsightCard
          icon="📆"
          label="Busiest Day of Week"
          value={`${busiestDay.day} — ${busiestDay.count} appointment${busiestDay.count !== 1 ? "s" : ""}`}
          note="Based on scheduled appointment dates"
        />
        <InsightCard
          icon="💼"
          label="Top Requested Topic"
          value={topSubject ? topSubject.subject : "—"}
          note={topSubject ? `${topSubject.count} request${topSubject.count !== 1 ? "s" : ""}` : undefined}
        />
      </div>

      {/* Row 1: Status Donut + Monthly Stacked Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Status Distribution"
          subtitle="Overall breakdown across all appointments"
        >
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name] ?? "#94a3b8"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v} (${Math.round((v / total) * 100)}%)`, name]}
                contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(v) => <span style={{ fontSize: "12px" }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Monthly Bookings by Status"
          subtitle="Stacked view of confirmed / rejected / pending per month"
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(v) => <span style={{ fontSize: "12px" }}>{v}</span>}
              />
              <Bar
                dataKey="confirm"
                name="Confirmed"
                stackId="a"
                fill={STATUS_COLORS.Confirmed}
              />
              <Bar
                dataKey="reject"
                name="Rejected"
                stackId="a"
                fill={STATUS_COLORS.Rejected}
              />
              <Bar
                dataKey="pending"
                name="Pending"
                stackId="a"
                fill={STATUS_COLORS.Pending}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Day of Week + Email Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Appointments by Day of Week"
          subtitle={`Peak day: ${busiestDay.day} with ${busiestDay.count} bookings`}
        >
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={dayData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
              <Bar dataKey="count" name="Appointments" radius={[4, 4, 0, 0]}>
                {dayData.map((entry) => (
                  <Cell
                    key={entry.day}
                    fill={entry.day === busiestDay.day ? "#4f46e5" : "#a5b4fc"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Client Email Domains"
          subtitle="Where your clients come from (top 5)"
        >
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={domainData}
                cx="50%"
                cy="50%"
                outerRadius={82}
                dataKey="count"
                nameKey="domain"
              >
                {domainData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v} client${v !== 1 ? "s" : ""}`, name]}
                contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(v) => <span style={{ fontSize: "12px" }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Subject Distribution */}
      {subjectData.length > 0 && (
        <ChartCard
          title="Top Requested Subjects"
          subtitle="Most common appointment topics — signals demand areas"
        >
          <ResponsiveContainer width="100%" height={subjectData.length * 46 + 20}>
            <BarChart
              data={subjectData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
            >
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="subject"
                tick={{ fontSize: 11 }}
                width={135}
              />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "13px" }} />
              <Bar dataKey="count" name="Requests" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </div>
  );
}
