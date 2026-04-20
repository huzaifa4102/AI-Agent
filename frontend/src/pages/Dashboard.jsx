import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ── Animated counter ────────────────────────────────────────────────────────
function useCountUp(target, duration = 900) {
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

// ── Theme tokens ────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    bg: "#f0f4ff",
    surface: "#ffffff",
    surfaceAlt: "#f8faff",
    border: "#e8edf8",
    text: "#0d1117",
    textMid: "#4a5568",
    textSoft: "#8896b0",
    header: "rgba(255,255,255,0.88)",
    hov: "#f5f7ff",
    tabBar: "#eaedfa",
    tabActive: "#ffffff",
    shadow: "0 2px 12px rgba(79,70,229,0.07)",
    shadowHov: "0 8px 30px rgba(79,70,229,0.14)",
    accent: "#4f46e5",
  },
  dark: {
    bg: "#080c18",
    surface: "#111827",
    surfaceAlt: "#0d1525",
    border: "#1e2a3a",
    text: "#f0f6ff",
    textMid: "#94a3b8",
    textSoft: "#4a5a72",
    header: "rgba(8,12,24,0.88)",
    hov: "#161f30",
    tabBar: "#0d1525",
    tabActive: "#1a2540",
    shadow: "0 2px 12px rgba(0,0,0,0.4)",
    shadowHov: "0 8px 30px rgba(0,0,0,0.5)",
    accent: "#818cf8",
  },
};

// ── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  new:         { label:"New",         l:["#dbeafe","#1d4ed8","#60a5fa"], d:["#1e3a5f","#93c5fd","#3b82f6"] },
  in_progress: { label:"In Progress", l:["#fef9c3","#92400e","#fbbf24"], d:["#3d2f00","#fcd34d","#f59e0b"] },
  completed:   { label:"Completed",   l:["#dcfce7","#14532d","#4ade80"], d:["#052e16","#86efac","#22c55e"] },
  lead:        { label:"Lead",        l:["#f3e8ff","#581c87","#c084fc"], d:["#2d1b4e","#d8b4fe","#a855f7"] },
  active:      { label:"Active",      l:["#dcfce7","#14532d","#4ade80"], d:["#052e16","#86efac","#22c55e"] },
};

const CHANNEL = {
  whatsapp: { label:"WhatsApp", l:["#dcfce7","#14532d"], d:["#052e16","#4ade80"], icon:"💬" },
  slack:    { label:"Slack",    l:["#ede9fe","#4c1d95"], d:["#1e1b4b","#a78bfa"], icon:"⚡" },
};

// ── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status, dark }) {
  const s = STATUS[status] || STATUS.new;
  const [bg, text, dot] = dark ? s.d : s.l;
  return (
    <span style={{ background:bg, color:text, padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:".3px", display:"inline-flex", alignItems:"center", gap:5, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:dot, display:"inline-block" }} />
      {s.label}
    </span>
  );
}

function ChannelBadge({ channel, dark }) {
  const c = CHANNEL[channel] || CHANNEL.slack;
  const [bg, text] = dark ? c.d : c.l;
  return (
    <span style={{ background:bg, color:text, padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:".3px", display:"inline-flex", alignItems:"center", gap:4, whiteSpace:"nowrap" }}>
      {c.icon} {c.label}
    </span>
  );
}

function Avatar({ name, size = 34 }) {
  const palettes = [["#6366f1","#a5b4fc"],["#ec4899","#f9a8d4"],["#f59e0b","#fcd34d"],["#10b981","#6ee7b7"],["#3b82f6","#93c5fd"],["#8b5cf6","#c4b5fd"]];
  const [from, to] = palettes[(name?.charCodeAt(0)||0) % palettes.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg,${from},${to})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:Math.round(size*.38), flexShrink:0, boxShadow:`0 2px 8px ${from}55` }}>
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function StatCard({ label, value, icon, from, to, delay, t }) {
  const count = useCountUp(value, 900);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(() => { const x = setTimeout(() => setVis(true), delay); return () => clearTimeout(x); }, [delay]);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:t.surface, borderRadius:18, padding:"20px 22px",
        border:`1px solid ${hov ? from+"55" : t.border}`,
        boxShadow: hov ? `0 8px 32px ${from}25` : t.shadow,
        transition:"all .25s cubic-bezier(.4,0,.2,1)",
        opacity:vis?1:0, transform:vis?(hov?"translateY(-5px)":"translateY(0)"):"translateY(20px)",
        cursor:"default", position:"relative", overflow:"hidden",
      }}
    >
      <div style={{ position:"absolute", top:-24, right:-24, width:90, height:90, borderRadius:"50%", background:`radial-gradient(circle,${from}1a,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ width:42, height:42, borderRadius:13, background:`linear-gradient(135deg,${from}22,${to}22)`, border:`1px solid ${from}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:14 }}>
        {icon}
      </div>
      <div style={{ fontSize:34, fontWeight:900, color:t.text, lineHeight:1, fontFamily:"Georgia, serif" }}>{count}</div>
      <div style={{ fontSize:11, color:t.textSoft, marginTop:6, fontWeight:700, letterSpacing:".6px", textTransform:"uppercase" }}>{label}</div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:hov?`linear-gradient(90deg,${from},${to})`:"transparent", transition:"background .25s", borderRadius:"0 0 18px 18px" }} />
    </div>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.25;}}
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:#6366f144;border-radius:999px;}
  select{appearance:none;-webkit-appearance:none;}
  input:focus{outline:none;}
  .ds-hov:hover{background:var(--hov)!important;}
  .ds-btn{transition:all .2s cubic-bezier(.4,0,.2,1);}
  @media(max-width:1100px){.ds-stats{grid-template-columns:repeat(3,1fr)!important;}}
  @media(max-width:768px){
    .ds-stats{grid-template-columns:repeat(2,1fr)!important;}
    .ds-overview{grid-template-columns:1fr!important;}
    .ds-main{padding:16px!important;}
    .ds-hdr{padding:0 16px!important;}
    .ds-search{width:130px!important;}
    .ds-hdr-right{gap:6px!important;}
  }
  @media(max-width:480px){
    .ds-stats{grid-template-columns:1fr 1fr!important;}
    .ds-search{width:100px!important;}
  }
`;

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [stats, setStats] = useState({});
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const t = isDark ? THEMES.dark : THEMES.light;

  const handleLogout = () => { logout(); navigate("/login"); };

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async (isRef = false) => {
    try {
      isRef ? setRefreshing(true) : setLoading(true);
      const [s, c, p] = await Promise.all([axios.get(`${API}/stats`), axios.get(`${API}/clients`), axios.get(`${API}/projects`)]);
      setStats(s.data); setClients(c.data); setProjects(p.data);
    } catch(e){ console.error(e); }
    finally { setLoading(false); setRefreshing(false); }
  };

  const updateStatus = async (id, status) => {
    try { await axios.patch(`${API}/projects/${id}`, { status }); fetchAll(true); } catch(e){ console.error(e); }
  };

  const fmt = d => new Date(d).toLocaleDateString("en-PK", { day:"numeric", month:"short", year:"numeric" });
  const q = search.toLowerCase();
  const fC = clients.filter(c => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q));
  const fP = projects.filter(p => p.clientName?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));

  const STATS = [
    { label:"Total Clients",  value:stats.totalClients||0,     icon:"👥", from:"#6366f1", to:"#8b5cf6", delay:0   },
    { label:"New Leads",      value:stats.newLeads||0,          icon:"✨", from:"#ec4899", to:"#f43f5e", delay:80  },
    { label:"Total Projects", value:stats.totalProjects||0,     icon:"📁", from:"#0ea5e9", to:"#38bdf8", delay:160 },
    { label:"In Progress",    value:stats.activeProjects||0,    icon:"⚡", from:"#f59e0b", to:"#fbbf24", delay:240 },
    { label:"Completed",      value:stats.completedProjects||0, icon:"✅", from:"#10b981", to:"#34d399", delay:320 },
  ];

  const TABS = [
    { id:"overview", label:"Overview" },
    { id:"clients",  label:`Clients · ${clients.length}` },
    { id:"projects", label:`Projects · ${projects.length}` },
  ];

  // ── Btn helpers ──
  const Btn = ({ onClick, children, danger, style: sx }) => {
    const [hov, setHov] = useState(false);
    return (
      <button onClick={onClick}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display:"flex", alignItems:"center", gap:5, padding:"0 14px", height:36, borderRadius:10, border:`1px solid ${danger?(hov?"#ef4444":"#ef444455"):(hov?"#6366f1":t.border)}`, background:danger?(hov?"#ef444411":"transparent"):(hov?t.hov:t.surfaceAlt), fontSize:12, fontWeight:700, color:danger?"#ef4444":(hov?"#6366f1":t.textMid), cursor:"pointer", transition:"all .2s", fontFamily:"'DM Sans',system-ui", letterSpacing:".2px", ...sx }}
      >{children}</button>
    );
  };

  const TH = ({ children }) => (
    <th style={{ textAlign:"left", fontSize:10, fontWeight:700, color:t.textSoft, padding:"12px 18px", letterSpacing:".7px", textTransform:"uppercase", whiteSpace:"nowrap", borderBottom:`1px solid ${t.border}`, background:t.surfaceAlt }}>{children}</th>
  );

  if (loading) return (
    <div style={{ minHeight:"100vh", background:isDark?"#080c18":"#f0f4ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{CSS}</style>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:"50%", border:"3px solid #6366f133", borderTopColor:"#6366f1", animation:"spin .9s linear infinite", margin:"0 auto 16px" }} />
        <p style={{ color:"#6366f1", fontSize:12, fontWeight:800, letterSpacing:"1.5px" }}>LOADING</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:t.bg, fontFamily:"'DM Sans',system-ui,sans-serif", color:t.text, transition:"background .3s,color .3s" }}>
      <style>{CSS + `:root{--hov:${t.hov};}`}</style>

      {/* ── HEADER ── */}
      <header className="ds-hdr" style={{ background:t.header, borderBottom:`1px solid ${t.border}`, padding:"0 32px", position:"sticky", top:0, zIndex:200, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>
        <div style={{ maxWidth:1340, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64, gap:12 }}>

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px #6366f144", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#fff2,transparent)" }} />
              <span style={{ color:"#fff", fontWeight:900, fontSize:15, letterSpacing:"-.5px" }}>DS</span>
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:t.text, letterSpacing:"-.3px" }}>DS Technologies</div>
              <div style={{ fontSize:10, color:t.textSoft, fontWeight:700, letterSpacing:".5px", textTransform:"uppercase" }}>AI Agent Dashboard</div>
            </div>
          </div>

          {/* Controls */}
          <div className="ds-hdr-right" style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>

            {/* Search */}
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:t.textSoft, fontSize:14, pointerEvents:"none" }}>⌕</span>
              <input className="ds-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                style={{ paddingLeft:30, paddingRight:12, height:36, borderRadius:10, border:`1px solid ${t.border}`, fontSize:13, color:t.text, background:t.surfaceAlt, width:200, transition:"all .2s", fontFamily:"'DM Sans',system-ui" }}
                onFocus={e => { e.target.style.borderColor="#6366f1"; e.target.style.boxShadow="0 0 0 3px #6366f118"; }}
                onBlur={e  => { e.target.style.borderColor=t.border; e.target.style.boxShadow="none"; }}
              />
            </div>

            <Btn onClick={() => fetchAll(true)}>
              <span style={{ display:"inline-block", animation:refreshing?"spin .8s linear infinite":"none", fontSize:15 }}>↻</span>
              Refresh
            </Btn>

            {/* Theme toggle */}
            <button onClick={() => setIsDark(d => !d)}
              style={{ width:36, height:36, borderRadius:10, border:`1px solid ${t.border}`, background:t.surfaceAlt, cursor:"pointer", fontSize:17, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
              title="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <Btn onClick={handleLogout} danger>🚪 Logout</Btn>

            {/* Live indicator */}
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:t.textSoft, fontWeight:800, letterSpacing:".6px" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", display:"inline-block", boxShadow:"0 0 8px #22c55e", animation:"pulse 2.5s infinite" }} />
              LIVE
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="ds-main" style={{ maxWidth:1340, margin:"0 auto", padding:"28px 32px" }}>

        {/* Stats */}
        <div className="ds-stats" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16, marginBottom:28 }}>
          {STATS.map(s => <StatCard key={s.label} {...s} t={t} />)}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:3, marginBottom:24, background:t.tabBar, padding:4, borderRadius:14, width:"fit-content", maxWidth:"100%", overflowX:"auto" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding:"8px 22px", borderRadius:11, border:"none", cursor:"pointer",
              fontSize:12, fontWeight:700, letterSpacing:".3px", transition:"all .2s cubic-bezier(.4,0,.2,1)",
              background:activeTab===tab.id ? t.tabActive : "transparent",
              color:activeTab===tab.id ? t.accent : t.textSoft,
              boxShadow:activeTab===tab.id ? t.shadow : "none",
              fontFamily:"'DM Sans',system-ui", whiteSpace:"nowrap",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="ds-overview" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, animation:"fadeUp .35s ease" }}>
            {[
              { title:"Recent Clients", empty:"👥", emptyMsg:"No clients yet", rows:clients.slice(0,5), renderRow:(c,i) => (
                <div key={c._id} className="ds-hov" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:i<4?`1px solid ${t.border}`:"none", transition:"background .15s", animation:`fadeUp .3s ease ${i*55}ms both`, gap:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
                    <Avatar name={c.name} />
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div>
                      <div style={{ fontSize:11, color:t.textSoft, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.email}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:5, flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end" }}>
                    <StatusBadge status={c.status} dark={isDark} />
                    <ChannelBadge channel={c.channel} dark={isDark} />
                  </div>
                </div>
              )},
              { title:"Recent Projects", empty:"📁", emptyMsg:"No projects yet", rows:projects.slice(0,5), renderRow:(p,i) => (
                <div key={p._id} className="ds-hov" style={{ padding:"13px 20px", borderBottom:i<4?`1px solid ${t.border}`:"none", transition:"background .15s", animation:`fadeUp .3s ease ${i*55}ms both` }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Avatar name={p.clientName} size={28} />
                      <span style={{ fontWeight:700, fontSize:13 }}>{p.clientName}</span>
                    </div>
                    <StatusBadge status={p.status} dark={isDark} />
                  </div>
                  <div style={{ fontSize:12, color:t.textMid, marginLeft:36, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.description}</div>
                  <div style={{ fontSize:11, color:t.textSoft, marginLeft:36, marginTop:4, fontWeight:600 }}>{fmt(p.createdAt)}</div>
                </div>
              )},
            ].map(panel => (
              <div key={panel.title} style={{ background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, overflow:"hidden", boxShadow:t.shadow }}>
                <div style={{ padding:"15px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:t.surfaceAlt }}>
                  <span style={{ fontWeight:800, fontSize:14, letterSpacing:"-.2px" }}>{panel.title}</span>
                  <span style={{ fontSize:10, color:t.textSoft, fontWeight:700, letterSpacing:".5px", textTransform:"uppercase", background:t.tabBar, padding:"3px 10px", borderRadius:999 }}>Last 5</span>
                </div>
                {panel.rows.length === 0
                  ? <div style={{ padding:"48px 0", textAlign:"center", color:t.textSoft }}>
                      <div style={{ fontSize:32, marginBottom:10 }}>{panel.empty}</div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{panel.emptyMsg}</div>
                    </div>
                  : panel.rows.map(panel.renderRow)}
              </div>
            ))}
          </div>
        )}

        {/* ── Clients & Projects Tables ── */}
        {(activeTab === "clients" || activeTab === "projects") && (() => {
          const isC = activeTab === "clients";
          const data = isC ? fC : fP;
          const headers = isC
            ? ["Client","Email","Phone","Channel","Project Summary","Status","Date"]
            : ["Client","Email","Project Description","Channel","Status","Date"];

          return (
            <div style={{ background:t.surface, borderRadius:18, border:`1px solid ${t.border}`, overflow:"hidden", boxShadow:t.shadow, animation:"fadeUp .35s ease" }}>
              <div style={{ padding:"16px 24px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, background:t.surfaceAlt }}>
                <span style={{ fontWeight:800, fontSize:14, letterSpacing:"-.2px" }}>{isC ? "All Clients" : "All Projects"}</span>
                <span style={{ fontSize:11, background:t.tabBar, color:t.textSoft, padding:"4px 13px", borderRadius:999, fontWeight:700 }}>
                  {data.length} {isC ? "clients" : "projects"}
                </span>
              </div>

              {data.length === 0 ? (
                <div style={{ padding:"64px 0", textAlign:"center", color:t.textSoft }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>{isC ? "👥" : "📁"}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:t.textMid, marginBottom:6 }}>Nothing here yet</div>
                  <div style={{ fontSize:12 }}>{isC ? "Clients appear here when they confirm via WhatsApp or Slack" : "Projects appear here automatically when clients confirm"}</div>
                </div>
              ) : (
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
                    <thead><tr>{headers.map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr key={row._id} className="ds-hov" style={{ borderBottom:`1px solid ${t.border}`, transition:"background .15s", animation:`fadeUp .25s ease ${i*30}ms both` }}>
                          <td style={{ padding:"13px 18px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <Avatar name={isC ? row.name : row.clientName} size={32} />
                              <span style={{ fontWeight:700, fontSize:13 }}>{isC ? row.name : row.clientName}</span>
                            </div>
                          </td>
                          <td style={{ padding:"13px 18px", fontSize:12, color:t.textMid }}>{isC ? row.email : row.clientEmail}</td>
                          {isC && <td style={{ padding:"13px 18px", fontSize:12, color:t.textMid }}>{row.phone || "—"}</td>}
                          <td style={{ padding:"13px 18px" }}><ChannelBadge channel={row.channel} dark={isDark} /></td>
                          <td style={{ padding:"13px 18px", fontSize:12, color:t.textMid, maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {isC ? (row.projectDetails || "—") : row.description}
                          </td>
                          <td style={{ padding:"13px 18px" }}>
                            {isC
                              ? <StatusBadge status={row.status} dark={isDark} />
                              : <select value={row.status} onChange={e => updateStatus(row._id, e.target.value)} style={{
                                  background: isDark ? STATUS[row.status]?.d[0] : STATUS[row.status]?.l[0],
                                  color:       isDark ? STATUS[row.status]?.d[1] : STATUS[row.status]?.l[1],
                                  border:"none", borderRadius:999, padding:"4px 12px", fontSize:11, fontWeight:700, cursor:"pointer", letterSpacing:".3px", fontFamily:"'DM Sans',system-ui",
                                }}>
                                  <option value="new">New</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </select>
                            }
                          </td>
                          <td style={{ padding:"13px 18px", fontSize:11, color:t.textSoft, whiteSpace:"nowrap", fontWeight:600 }}>{fmt(row.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })()}

      </main>
    </div>
  );
}