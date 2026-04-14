// import { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/dashboard";

// const statusColors = {
//   new: "bg-blue-100 text-blue-700",
//   in_progress: "bg-yellow-100 text-yellow-700",
//   completed: "bg-green-100 text-green-700",
//   lead: "bg-purple-100 text-purple-700",
//   active: "bg-green-100 text-green-700",
// };

// const statusLabels = {
//   new: "New",
//   in_progress: "In Progress",
//   completed: "Completed",
//   lead: "Lead",
//   active: "Active",
// };

// export default function Dashboard() {
//   const [stats, setStats] = useState({});
//   const [clients, setClients] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       const [statsRes, clientsRes, projectsRes] = await Promise.all([
//         axios.get(`${API}/stats`),
//         axios.get(`${API}/clients`),
//         axios.get(`${API}/projects`),
//       ]);
//       setStats(statsRes.data);
//       setClients(clientsRes.data);
//       setProjects(projectsRes.data);
//     } catch (err) {
//       console.error("Dashboard error:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`${API}/projects/${id}`, { status });
//       fetchAll();
//     } catch (err) {
//       console.error("Update error:", err.message);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-PK", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">DS</span>
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-sm">DS Technologies Pvt. Limited</p>
//               <p className="text-xs text-gray-500">AI Agent Dashboard</p>
//             </div>
//           </div>
//           <button
//             onClick={fetchAll}
//             className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-6">

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//           {[
//             { label: "Total Clients", value: stats.totalClients || 0, color: "bg-blue-600" },
//             { label: "New Leads", value: stats.newLeads || 0, color: "bg-purple-600" },
//             { label: "Total Projects", value: stats.totalProjects || 0, color: "bg-indigo-600" },
//             { label: "In Progress", value: stats.activeProjects || 0, color: "bg-yellow-500" },
//             { label: "Completed", value: stats.completedProjects || 0, color: "bg-green-600" },
//           ].map((stat) => (
//             <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
//               <div className={`w-8 h-8 ${stat.color} rounded-lg mb-3`}></div>
//               <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//               <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6">
//           {["overview", "clients", "projects"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
//                 activeTab === tab
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl border border-gray-200 p-5">
//               <h3 className="font-semibold text-gray-800 mb-4">Recent Clients</h3>
//               {clients.length === 0 ? (
//                 <p className="text-gray-400 text-sm text-center py-8">No clients yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {clients.slice(0, 5).map((client) => (
//                     <div key={client._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xs">
//                           {client.name?.charAt(0)?.toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-800">{client.name}</p>
//                           <p className="text-xs text-gray-400">{client.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[client.status]}`}>
//                           {statusLabels[client.status]}
//                         </span>
//                         <span className="text-xs text-gray-400">{client.channel}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="bg-white rounded-xl border border-gray-200 p-5">
//               <h3 className="font-semibold text-gray-800 mb-4">Recent Projects</h3>
//               {projects.length === 0 ? (
//                 <p className="text-gray-400 text-sm text-center py-8">No projects yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {projects.slice(0, 5).map((project) => (
//                     <div key={project._id} className="py-2 border-b border-gray-50 last:border-0">
//                       <div className="flex items-center justify-between mb-1">
//                         <p className="text-sm font-medium text-gray-800">{project.clientName}</p>
//                         <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
//                           {statusLabels[project.status]}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-400 truncate">{project.description}</p>
//                       <p className="text-xs text-gray-300 mt-1">{formatDate(project.createdAt)}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Clients Tab */}
//         {activeTab === "clients" && (
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             <div className="px-5 py-4 border-b border-gray-100">
//               <h3 className="font-semibold text-gray-800">All Clients ({clients.length})</h3>
//             </div>
//             {clients.length === 0 ? (
//               <p className="text-gray-400 text-sm text-center py-12">No clients yet.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       {["Client", "Email", "Channel", "Project", "Status", "Date"].map((h) => (
//                         <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {clients.map((client) => (
//                       <tr key={client._id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//                         <td className="px-5 py-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
//                               {client.name?.charAt(0)?.toUpperCase()}
//                             </div>
//                             <p className="text-sm font-medium text-gray-800">{client.name}</p>
//                           </div>
//                         </td>
//                         <td className="px-5 py-3 text-sm text-gray-500">{client.email}</td>
//                         <td className="px-5 py-3">
//                           <span className={`text-xs px-2 py-1 rounded-full font-medium ${
//                             client.channel === "whatsapp"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-purple-100 text-purple-700"
//                           }`}>
//                             {client.channel}
//                           </span>
//                         </td>
//                         <td className="px-5 py-3 text-sm text-gray-500 max-w-xs truncate">{client.projectDetails}</td>
//                         <td className="px-5 py-3">
//                           <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[client.status]}`}>
//                             {statusLabels[client.status]}
//                           </span>
//                         </td>
//                         <td className="px-5 py-3 text-xs text-gray-400">{formatDate(client.createdAt)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Projects Tab */}
//         {activeTab === "projects" && (
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             <div className="px-5 py-4 border-b border-gray-100">
//               <h3 className="font-semibold text-gray-800">All Projects ({projects.length})</h3>
//             </div>
//             {projects.length === 0 ? (
//               <p className="text-gray-400 text-sm text-center py-12">No projects yet.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       {["Client", "Email", "Description", "Channel", "Status", "Date"].map((h) => (
//                         <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-3">{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {projects.map((project) => (
//                       <tr key={project._id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
//                         <td className="px-5 py-3">
//                           <p className="text-sm font-medium text-gray-800">{project.clientName}</p>
//                         </td>
//                         <td className="px-5 py-3 text-sm text-gray-500">{project.clientEmail}</td>
//                         <td className="px-5 py-3 text-sm text-gray-500 max-w-xs truncate">{project.description}</td>
//                         <td className="px-5 py-3">
//                           <span className={`text-xs px-2 py-1 rounded-full font-medium ${
//                             project.channel === "whatsapp"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-purple-100 text-purple-700"
//                           }`}>
//                             {project.channel}
//                           </span>
//                         </td>
//                         <td className="px-5 py-3">
//                           <select
//                             value={project.status}
//                             onChange={(e) => updateStatus(project._id, e.target.value)}
//                             className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${statusColors[project.status]}`}
//                           >
//                             <option value="new">New</option>
//                             <option value="in_progress">In Progress</option>
//                             <option value="completed">Completed</option>
//                           </select>
//                         </td>
//                         <td className="px-5 py-3 text-xs text-gray-400">{formatDate(project.createdAt)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }




// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/dashboard";

// // ── Animated counter hook ──────────────────────────────────────────────────
// function useCountUp(target, duration = 1000) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     if (!target) return;
//     let start = 0;
//     const step = target / (duration / 16);
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= target) { setValue(target); clearInterval(timer); }
//       else setValue(Math.floor(start));
//     }, 16);
//     return () => clearInterval(timer);
//   }, [target]);
//   return value;
// }

// // ── Status config ──────────────────────────────────────────────────────────
// const STATUS = {
//   new:         { label: "New",         bg: "#e0f2fe", color: "#0369a1", dot: "#38bdf8" },
//   in_progress: { label: "In Progress", bg: "#fef9c3", color: "#854d0e", dot: "#facc15" },
//   completed:   { label: "Completed",   bg: "#dcfce7", color: "#166534", dot: "#4ade80" },
//   lead:        { label: "Lead",        bg: "#f3e8ff", color: "#6b21a8", dot: "#c084fc" },
//   active:      { label: "Active",      bg: "#dcfce7", color: "#166534", dot: "#4ade80" },
// };

// const CHANNEL = {
//   whatsapp: { bg: "#dcfce7", color: "#166534", icon: "💬" },
//   slack:    { bg: "#ede9fe", color: "#5b21b6", icon: "⚡" },
// };

// function StatusBadge({ status }) {
//   const s = STATUS[status] || STATUS.new;
//   return (
//     <span style={{
//       background: s.bg, color: s.color,
//       padding: "3px 10px", borderRadius: 999,
//       fontSize: 11, fontWeight: 700, letterSpacing: ".4px",
//       display: "inline-flex", alignItems: "center", gap: 5,
//     }}>
//       <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
//       {s.label}
//     </span>
//   );
// }

// function ChannelBadge({ channel }) {
//   const c = CHANNEL[channel] || CHANNEL.slack;
//   return (
//     <span style={{
//       background: c.bg, color: c.color,
//       padding: "3px 10px", borderRadius: 999,
//       fontSize: 11, fontWeight: 700, letterSpacing: ".4px",
//       display: "inline-flex", alignItems: "center", gap: 4,
//     }}>
//       {c.icon} {channel}
//     </span>
//   );
// }

// function Avatar({ name, size = 36 }) {
//   const colors = ["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#8b5cf6"];
//   const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: color, display: "flex", alignItems: "center", justifyContent: "center",
//       color: "#fff", fontWeight: 800, fontSize: size * 0.38,
//       flexShrink: 0, boxShadow: `0 0 0 2px white, 0 0 0 3px ${color}33`,
//     }}>
//       {name?.charAt(0)?.toUpperCase() || "?"}
//     </div>
//   );
// }

// // ── Stat Card ──────────────────────────────────────────────────────────────
// function StatCard({ label, value, icon, accent, delay = 0 }) {
//   const count = useCountUp(value, 800);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
//   return (
//     <div style={{
//       background: "#fff", borderRadius: 16, padding: "20px 22px",
//       border: "1px solid #f1f5f9",
//       boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
//       transition: "transform .2s, box-shadow .2s",
//       opacity: visible ? 1 : 0,
//       transform: visible ? "translateY(0)" : "translateY(18px)",
//       cursor: "default",
//     }}
//       onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,.1)"; }}
//       onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)"; }}
//     >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//         <span style={{ fontSize: 22 }}>{icon}</span>
//         <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
//       </div>
//       <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", fontFamily: "'Georgia', serif", lineHeight: 1 }}>
//         {count}
//       </div>
//       <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase" }}>
//         {label}
//       </div>
//     </div>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────────────────
// export default function Dashboard() {
//   const [stats, setStats] = useState({});
//   const [clients, setClients] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState("");

//   useEffect(() => { fetchAll(); }, []);

//   const fetchAll = async (isRefresh = false) => {
//     try {
//       isRefresh ? setRefreshing(true) : setLoading(true);
//       const [s, c, p] = await Promise.all([
//         axios.get(`${API}/stats`),
//         axios.get(`${API}/clients`),
//         axios.get(`${API}/projects`),
//       ]);
//       setStats(s.data);
//       setClients(c.data);
//       setProjects(p.data);
//     } catch (err) {
//       console.error("Dashboard error:", err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`${API}/projects/${id}`, { status });
//       fetchAll(true);
//     } catch (err) { console.error(err); }
//   };

//   const fmt = (d) => new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });

//   const filteredClients = clients.filter(c =>
//     c.name?.toLowerCase().includes(search.toLowerCase()) ||
//     c.email?.toLowerCase().includes(search.toLowerCase())
//   );
//   const filteredProjects = projects.filter(p =>
//     p.clientName?.toLowerCase().includes(search.toLowerCase()) ||
//     p.description?.toLowerCase().includes(search.toLowerCase())
//   );

//   // ── Loading screen ──
//   if (loading) return (
//     <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
//       <div style={{ textAlign: "center" }}>
//         <div style={{
//           width: 48, height: 48, borderRadius: "50%",
//           border: "3px solid #e2e8f0", borderTopColor: "#6366f1",
//           animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
//         }} />
//         <p style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>Loading your dashboard…</p>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     </div>
//   );

//   const tabs = ["overview", "clients", "projects"];

//   return (
//     <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#0f172a" }}>
//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 6px; height: 6px; }
//         ::-webkit-scrollbar-track { background: #f1f5f9; }
//         ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
//         select { appearance: none; -webkit-appearance: none; }
//         input:focus { outline: none; }
//       `}</style>

//       {/* ── Header ── */}
//       <div style={{
//         background: "#fff", borderBottom: "1px solid #f1f5f9",
//         padding: "0 32px", position: "sticky", top: 0, zIndex: 100,
//         boxShadow: "0 1px 0 #f1f5f9",
//       }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 38, height: 38, borderRadius: 10,
//               background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 4px 12px #6366f140",
//             }}>
//               <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>DS</span>
//             </div>
//             <div>
//               <div style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>DS Technologies</div>
//               <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>AI Agent Dashboard</div>
//             </div>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {/* Search */}
//             <div style={{ position: "relative" }}>
//               <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#94a3b8" }}>🔍</span>
//               <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search clients or projects…"
//                 style={{
//                   paddingLeft: 32, paddingRight: 14, height: 36, borderRadius: 8,
//                   border: "1px solid #e2e8f0", fontSize: 13, color: "#334155",
//                   background: "#f8fafc", width: 220, transition: "border .2s",
//                 }}
//                 onFocus={e => e.target.style.borderColor = "#6366f1"}
//                 onBlur={e => e.target.style.borderColor = "#e2e8f0"}
//               />
//             </div>

//             {/* Refresh */}
//             <button
//               onClick={() => fetchAll(true)}
//               style={{
//                 display: "flex", alignItems: "center", gap: 6,
//                 padding: "0 14px", height: 36, borderRadius: 8,
//                 border: "1px solid #e2e8f0", background: "#fff",
//                 fontSize: 13, fontWeight: 600, color: "#6366f1", cursor: "pointer",
//                 transition: "all .2s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#6366f1"; }}
//               onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
//             >
//               <span style={{ display: "inline-block", animation: refreshing ? "spin .8s linear infinite" : "none" }}>↻</span>
//               Refresh
//             </button>

//             {/* Live dot */}
//             <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontWeight: 600 }}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 0 2px #dcfce7" }} />
//               Live
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px" }}>

//         {/* ── Stats ── */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 28 }}>
//           <StatCard label="Total Clients"  value={stats.totalClients || 0}     icon="👥" accent="#6366f1" delay={0}   />
//           <StatCard label="New Leads"      value={stats.newLeads || 0}          icon="✨" accent="#c084fc" delay={80}  />
//           <StatCard label="Total Projects" value={stats.totalProjects || 0}     icon="📁" accent="#38bdf8" delay={160} />
//           <StatCard label="In Progress"    value={stats.activeProjects || 0}    icon="⚡" accent="#facc15" delay={240} />
//           <StatCard label="Completed"      value={stats.completedProjects || 0} icon="✅" accent="#4ade80" delay={320} />
//         </div>

//         {/* ── Tabs ── */}
//         <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#f1f5f9", padding: 4, borderRadius: 12, width: "fit-content" }}>
//           {tabs.map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)} style={{
//               padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
//               fontSize: 13, fontWeight: 700, letterSpacing: ".3px",
//               transition: "all .2s",
//               background: activeTab === tab ? "#fff" : "transparent",
//               color: activeTab === tab ? "#6366f1" : "#64748b",
//               boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,.1)" : "none",
//               textTransform: "capitalize",
//             }}>
//               {tab === "overview" ? "📊 Overview" : tab === "clients" ? `👥 Clients (${clients.length})` : `📁 Projects (${projects.length})`}
//             </button>
//           ))}
//         </div>

//         {/* ── Overview Tab ── */}
//         {activeTab === "overview" && (
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, animation: "fadeIn .3s ease" }}>

//             {/* Recent Clients */}
//             <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
//               <div style={{ padding: "18px 22px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <div style={{ fontWeight: 800, fontSize: 15 }}>Recent Clients</div>
//                 <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>Last 5</span>
//               </div>
//               <div style={{ padding: "8px 0" }}>
//                 {clients.length === 0 ? (
//                   <div style={{ padding: "40px 0", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}>
//                     <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
//                     No clients yet
//                   </div>
//                 ) : clients.slice(0, 5).map((client, i) => (
//                   <div key={client._id} style={{
//                     display: "flex", alignItems: "center", justifyContent: "space-between",
//                     padding: "12px 22px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none",
//                     transition: "background .15s",
//                     animation: `fadeIn .3s ease ${i * 60}ms both`,
//                   }}
//                     onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
//                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//                   >
//                     <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                       <Avatar name={client.name} />
//                       <div>
//                         <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{client.name}</div>
//                         <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{client.email}</div>
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                       <StatusBadge status={client.status} />
//                       <ChannelBadge channel={client.channel} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Projects */}
//             <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
//               <div style={{ padding: "18px 22px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <div style={{ fontWeight: 800, fontSize: 15 }}>Recent Projects</div>
//                 <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>Last 5</span>
//               </div>
//               <div style={{ padding: "8px 0" }}>
//                 {projects.length === 0 ? (
//                   <div style={{ padding: "40px 0", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}>
//                     <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
//                     No projects yet
//                   </div>
//                 ) : projects.slice(0, 5).map((project, i) => (
//                   <div key={project._id} style={{
//                     padding: "14px 22px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none",
//                     transition: "background .15s",
//                     animation: `fadeIn .3s ease ${i * 60}ms both`,
//                   }}
//                     onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
//                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//                   >
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                         <Avatar name={project.clientName} size={28} />
//                         <span style={{ fontWeight: 700, fontSize: 13 }}>{project.clientName}</span>
//                       </div>
//                       <StatusBadge status={project.status} />
//                     </div>
//                     <div style={{ fontSize: 12, color: "#64748b", marginLeft: 36, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 280 }}>
//                       {project.description}
//                     </div>
//                     <div style={{ fontSize: 11, color: "#cbd5e1", marginLeft: 36, marginTop: 4 }}>{fmt(project.createdAt)}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         )}

//         {/* ── Clients Tab ── */}
//         {activeTab === "clients" && (
//           <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)", animation: "fadeIn .3s ease" }}>
//             <div style={{ padding: "18px 24px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <div style={{ fontWeight: 800, fontSize: 15 }}>All Clients</div>
//               <div style={{ fontSize: 12, background: "#f1f5f9", color: "#64748b", padding: "4px 12px", borderRadius: 999, fontWeight: 700 }}>
//                 {filteredClients.length} total
//               </div>
//             </div>
//             {filteredClients.length === 0 ? (
//               <div style={{ padding: "60px 0", textAlign: "center", color: "#cbd5e1" }}>
//                 <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
//                 <div style={{ fontSize: 14, fontWeight: 600 }}>No clients found</div>
//                 <div style={{ fontSize: 12, marginTop: 4 }}>Clients appear here when they confirm via WhatsApp or Slack</div>
//               </div>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr style={{ background: "#f8fafc" }}>
//                       {["Client", "Email", "Phone", "Channel", "Project Summary", "Status", "Date"].map(h => (
//                         <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", padding: "12px 20px", letterSpacing: ".5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredClients.map((client, i) => (
//                       <tr key={client._id} style={{
//                         borderTop: "1px solid #f8fafc", transition: "background .15s",
//                         animation: `fadeIn .25s ease ${i * 40}ms both`,
//                       }}
//                         onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
//                         onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//                       >
//                         <td style={{ padding: "14px 20px" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                             <Avatar name={client.name} size={32} />
//                             <span style={{ fontWeight: 700, fontSize: 13 }}>{client.name}</span>
//                           </div>
//                         </td>
//                         <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748b" }}>{client.email}</td>
//                         <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748b" }}>{client.phone || "—"}</td>
//                         <td style={{ padding: "14px 20px" }}><ChannelBadge channel={client.channel} /></td>
//                         <td style={{ padding: "14px 20px", fontSize: 12, color: "#64748b", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{client.projectDetails || "—"}</td>
//                         <td style={{ padding: "14px 20px" }}><StatusBadge status={client.status} /></td>
//                         <td style={{ padding: "14px 20px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{fmt(client.createdAt)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── Projects Tab ── */}
//         {activeTab === "projects" && (
//           <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.05)", animation: "fadeIn .3s ease" }}>
//             <div style={{ padding: "18px 24px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <div style={{ fontWeight: 800, fontSize: 15 }}>All Projects</div>
//               <div style={{ fontSize: 12, background: "#f1f5f9", color: "#64748b", padding: "4px 12px", borderRadius: 999, fontWeight: 700 }}>
//                 {filteredProjects.length} total
//               </div>
//             </div>
//             {filteredProjects.length === 0 ? (
//               <div style={{ padding: "60px 0", textAlign: "center", color: "#cbd5e1" }}>
//                 <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
//                 <div style={{ fontSize: 14, fontWeight: 600 }}>No projects found</div>
//                 <div style={{ fontSize: 12, marginTop: 4 }}>Projects appear here automatically when clients confirm</div>
//               </div>
//             ) : (
//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr style={{ background: "#f8fafc" }}>
//                       {["Client", "Email", "Project Description", "Channel", "Status", "Date"].map(h => (
//                         <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", padding: "12px 20px", letterSpacing: ".5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProjects.map((project, i) => (
//                       <tr key={project._id} style={{
//                         borderTop: "1px solid #f8fafc", transition: "background .15s",
//                         animation: `fadeIn .25s ease ${i * 40}ms both`,
//                       }}
//                         onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
//                         onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//                       >
//                         <td style={{ padding: "14px 20px" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                             <Avatar name={project.clientName} size={32} />
//                             <span style={{ fontWeight: 700, fontSize: 13 }}>{project.clientName}</span>
//                           </div>
//                         </td>
//                         <td style={{ padding: "14px 20px", fontSize: 13, color: "#64748b" }}>{project.clientEmail}</td>
//                         <td style={{ padding: "14px 20px", fontSize: 12, color: "#64748b", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.description}</td>
//                         <td style={{ padding: "14px 20px" }}><ChannelBadge channel={project.channel} /></td>
//                         <td style={{ padding: "14px 20px" }}>
//                           <select
//                             value={project.status}
//                             onChange={e => updateStatus(project._id, e.target.value)}
//                             style={{
//                               background: STATUS[project.status]?.bg,
//                               color: STATUS[project.status]?.color,
//                               border: "none", borderRadius: 999,
//                               padding: "4px 10px", fontSize: 11, fontWeight: 700,
//                               cursor: "pointer", letterSpacing: ".3px",
//                             }}
//                           >
//                             <option value="new">New</option>
//                             <option value="in_progress">In Progress</option>
//                             <option value="completed">Completed</option>
//                           </select>
//                         </td>
//                         <td style={{ padding: "14px 20px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{fmt(project.createdAt)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }









import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return value;
}

// ── Config ─────────────────────────────────────────────────────────────────
const STATUS = {
  new:         { label: "New",         bg: "#e0f2fe", color: "#0369a1", dot: "#38bdf8" },
  in_progress: { label: "In Progress", bg: "#fef9c3", color: "#854d0e", dot: "#facc15" },
  completed:   { label: "Completed",   bg: "#dcfce7", color: "#166534", dot: "#4ade80" },
  lead:        { label: "Lead",        bg: "#f3e8ff", color: "#6b21a8", dot: "#c084fc" },
  active:      { label: "Active",      bg: "#dcfce7", color: "#166534", dot: "#4ade80" },
};

const CHANNEL = {
  whatsapp: { bg: "#dcfce7", color: "#166534", icon: "💬" },
  slack:    { bg: "#ede9fe", color: "#5b21b6", icon: "⚡" },
};

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.new;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 9px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: ".3px",
      display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block", flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function ChannelBadge({ channel }) {
  const c = CHANNEL[channel] || CHANNEL.slack;
  return (
    <span style={{
      background: c.bg, color: c.color,
      padding: "3px 9px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: ".3px",
      display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
    }}>
      {c.icon} {channel}
    </span>
  );
}

function Avatar({ name, size = 34 }) {
  const colors = ["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#8b5cf6"];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: Math.round(size * 0.36),
      flexShrink: 0,
    }}>
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function StatCard({ label, value, icon, accent, delay = 0 }) {
  const count = useCountUp(value, 800);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "18px 20px",
      border: "1px solid #f1f5f9",
      boxShadow: "0 1px 3px rgba(0,0,0,.05)",
      transition: "transform .2s, box-shadow .2s, opacity .3s",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.09)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.05)"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, marginTop: 2 }} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

// ── Responsive styles injected once ────────────────────────────────────────
const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
  select { appearance: none; -webkit-appearance: none; }
  input:focus { outline: none; }

  .ds-stats {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    margin-bottom: 26px;
  }
  .ds-overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .ds-header-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .ds-search-input { width: 210px; }
  .ds-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .ds-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .ds-table-wrap table { min-width: 580px; }
  .ds-client-badges { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .ds-hov:hover { background: #fafafa !important; }
  .ds-live-dot { animation: pulse 2s infinite; }

  @media (max-width: 1024px) {
    .ds-stats { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .ds-stats { grid-template-columns: repeat(2, 1fr); }
    .ds-overview { grid-template-columns: 1fr; }
    .ds-search-input { width: 150px; }
    .ds-main { padding: 16px !important; }
    .ds-header-inner { height: auto !important; padding: 10px 0 !important; flex-wrap: wrap; gap: 8px; }
  }
  @media (max-width: 480px) {
    .ds-stats { grid-template-columns: 1fr 1fr; }
    .ds-search-input { width: 120px; }
    .ds-header { padding: 0 16px !important; }
    .ds-client-badges { flex-direction: column; align-items: flex-end; gap: 3px; }
  }
  @media (max-width: 360px) {
    .ds-stats { grid-template-columns: 1fr; }
  }
`;

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [stats, setStats]       = useState({});
  const [clients, setClients]   = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch]     = useState("");

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const [s, c, p] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/clients`),
        axios.get(`${API}/projects`),
      ]);
      setStats(s.data);
      setClients(c.data);
      setProjects(p.data);
    } catch (err) {
      console.error("Dashboard error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/projects/${id}`, { status });
      fetchAll(true);
    } catch (err) { console.error(err); }
  };

  const fmt = (d) => new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });

  const q = search.toLowerCase();
  const filteredClients  = clients.filter(c  => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q));
  const filteredProjects = projects.filter(p => p.clientName?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));

  // ── Loading ──
  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
      <style>{STYLES}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#6366f1", animation: "spin .8s linear infinite", margin: "0 auto 14px" }} />
        <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>Loading your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#0f172a" }}>
      <style>{STYLES}</style>

      {/* ── Header ── */}
      <div className="ds-header" style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="ds-header-inner" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>DS</span>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>DS Technologies</div>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>AI Agent Dashboard</div>
            </div>
          </div>

          {/* Right controls */}
          <div className="ds-header-right">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#94a3b8" }}>🔍</span>
              <input
                className="ds-search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                style={{ paddingLeft: 30, paddingRight: 12, height: 34, borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, color: "#334155", background: "#f8fafc", transition: "border .2s" }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
            <button
              onClick={() => fetchAll(true)}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 13px", height: 34, borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", fontSize: 12, fontWeight: 600, color: "#6366f1", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#6366f1"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <span style={{ display: "inline-block", animation: refreshing ? "spin .8s linear infinite" : "none" }}>↻</span>
              Refresh
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b", fontWeight: 600 }}>
              <span className="ds-live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Live
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ds-main" style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 28px" }}>

        {/* Stats */}
        <div className="ds-stats">
          <StatCard label="Total Clients"  value={stats.totalClients || 0}     icon="👥" accent="#6366f1" delay={0}   />
          <StatCard label="New Leads"      value={stats.newLeads || 0}          icon="✨" accent="#c084fc" delay={70}  />
          <StatCard label="Total Projects" value={stats.totalProjects || 0}     icon="📁" accent="#38bdf8" delay={140} />
          <StatCard label="In Progress"    value={stats.activeProjects || 0}    icon="⚡" accent="#facc15" delay={210} />
          <StatCard label="Completed"      value={stats.completedProjects || 0} icon="✅" accent="#4ade80" delay={280} />
        </div>

        {/* Tabs */}
        <div className="ds-tabs" style={{ display: "flex", gap: 3, marginBottom: 22, background: "#f1f5f9", padding: 4, borderRadius: 10, width: "fit-content", maxWidth: "100%" }}>
          {[["overview","📊 Overview"],["clients",`👥 Clients (${clients.length})`],["projects",`📁 Projects (${projects.length})`]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: "7px 16px", borderRadius: 7, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 700, letterSpacing: ".2px", transition: "all .2s",
              background: activeTab === id ? "#fff" : "transparent",
              color: activeTab === id ? "#6366f1" : "#64748b",
              boxShadow: activeTab === id ? "0 1px 4px rgba(0,0,0,.08)" : "none",
              whiteSpace: "nowrap",
            }}>{label}</button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="ds-overview" style={{ animation: "fadeIn .3s ease" }}>

            {/* Recent Clients */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Recent Clients</div>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>Last 5</span>
              </div>
              {clients.length === 0
                ? <div style={{ padding: "40px 0", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}><div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>No clients yet</div>
                : clients.slice(0, 5).map((c, i) => (
                  <div key={c._id} className="ds-hov" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 20px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none", transition: "background .15s", animation: `fadeIn .3s ease ${i*55}ms both`, gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <Avatar name={c.name} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</div>
                      </div>
                    </div>
                    <div className="ds-client-badges">
                      <StatusBadge status={c.status} />
                      <ChannelBadge channel={c.channel} />
                    </div>
                  </div>
                ))}
            </div>

            {/* Recent Projects */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Recent Projects</div>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>Last 5</span>
              </div>
              {projects.length === 0
                ? <div style={{ padding: "40px 0", textAlign: "center", color: "#cbd5e1", fontSize: 13 }}><div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>No projects yet</div>
                : projects.slice(0, 5).map((p, i) => (
                  <div key={p._id} className="ds-hov" style={{ padding: "13px 20px", borderBottom: i < 4 ? "1px solid #f8fafc" : "none", transition: "background .15s", animation: `fadeIn .3s ease ${i*55}ms both` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar name={p.clientName} size={26} />
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{p.clientName}</span>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginLeft: 34, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</div>
                    <div style={{ fontSize: 11, color: "#cbd5e1", marginLeft: 34, marginTop: 3 }}>{fmt(p.createdAt)}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── Clients ── */}
        {activeTab === "clients" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)", animation: "fadeIn .3s ease" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>All Clients</div>
              <div style={{ fontSize: 11, background: "#f1f5f9", color: "#64748b", padding: "3px 11px", borderRadius: 999, fontWeight: 700 }}>{filteredClients.length} total</div>
            </div>
            {filteredClients.length === 0
              ? <div style={{ padding: "55px 0", textAlign: "center", color: "#cbd5e1" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>No clients found</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>Clients appear here when they confirm via WhatsApp or Slack</div>
                </div>
              : <div className="ds-table-wrap">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Client","Email","Phone","Channel","Project Summary","Status","Date"].map(h => (
                          <th key={h} style={{ textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", padding: "11px 18px", letterSpacing: ".5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((c, i) => (
                        <tr key={c._id} className="ds-hov" style={{ borderTop: "1px solid #f8fafc", transition: "background .15s", animation: `fadeIn .25s ease ${i*35}ms both` }}>
                          <td style={{ padding: "13px 18px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                              <Avatar name={c.name} size={30} />
                              <span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: "13px 18px", fontSize: 12, color: "#64748b" }}>{c.email}</td>
                          <td style={{ padding: "13px 18px", fontSize: 12, color: "#64748b" }}>{c.phone || "—"}</td>
                          <td style={{ padding: "13px 18px" }}><ChannelBadge channel={c.channel} /></td>
                          <td style={{ padding: "13px 18px", fontSize: 12, color: "#64748b", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.projectDetails || "—"}</td>
                          <td style={{ padding: "13px 18px" }}><StatusBadge status={c.status} /></td>
                          <td style={{ padding: "13px 18px", fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>{fmt(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
          </div>
        )}

        {/* ── Projects ── */}
        {activeTab === "projects" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)", animation: "fadeIn .3s ease" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>All Projects</div>
              <div style={{ fontSize: 11, background: "#f1f5f9", color: "#64748b", padding: "3px 11px", borderRadius: 999, fontWeight: 700 }}>{filteredProjects.length} total</div>
            </div>
            {filteredProjects.length === 0
              ? <div style={{ padding: "55px 0", textAlign: "center", color: "#cbd5e1" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📁</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>No projects found</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>Projects appear here automatically when clients confirm</div>
                </div>
              : <div className="ds-table-wrap">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Client","Email","Project Description","Channel","Status","Date"].map(h => (
                          <th key={h} style={{ textAlign: "left", fontSize: 10, fontWeight: 700, color: "#94a3b8", padding: "11px 18px", letterSpacing: ".5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((p, i) => (
                        <tr key={p._id} className="ds-hov" style={{ borderTop: "1px solid #f8fafc", transition: "background .15s", animation: `fadeIn .25s ease ${i*35}ms both` }}>
                          <td style={{ padding: "13px 18px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                              <Avatar name={p.clientName} size={30} />
                              <span style={{ fontWeight: 700, fontSize: 13 }}>{p.clientName}</span>
                            </div>
                          </td>
                          <td style={{ padding: "13px 18px", fontSize: 12, color: "#64748b" }}>{p.clientEmail}</td>
                          <td style={{ padding: "13px 18px", fontSize: 12, color: "#64748b", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</td>
                          <td style={{ padding: "13px 18px" }}><ChannelBadge channel={p.channel} /></td>
                          <td style={{ padding: "13px 18px" }}>
                            <select
                              value={p.status}
                              onChange={e => updateStatus(p._id, e.target.value)}
                              style={{
                                background: STATUS[p.status]?.bg || STATUS.new.bg,
                                color: STATUS[p.status]?.color || STATUS.new.color,
                                border: "none", borderRadius: 999,
                                padding: "4px 10px", fontSize: 11, fontWeight: 700,
                                cursor: "pointer", letterSpacing: ".3px",
                              }}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td style={{ padding: "13px 18px", fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>{fmt(p.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
          </div>
        )}

      </div>
    </div>
  );
}