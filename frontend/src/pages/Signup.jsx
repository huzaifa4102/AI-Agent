import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required"); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match"); return;
    }

    setLoading(true);
    const result = await signup(form.name, form.email, form.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, color: "#0f172a", background: "#f8fafc",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontSize: 12, fontWeight: 700,
    color: "#374151", marginBottom: 6, letterSpacing: ".3px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "44px 40px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>DS</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
            Create Account
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
            Register as DS Technologies Admin
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 10, padding: "10px 14px", marginBottom: 20,
            fontSize: 13, color: "#dc2626",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>FULL NAME</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Your full name" style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="your@email.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>PASSWORD</label>
            <div style={{ position: "relative" }}>
              <input
                name="password" type={showPass ? "text" : "password"}
                value={form.password} onChange={handleChange}
                placeholder="Minimum 6 characters"
                style={{ ...inputStyle, paddingRight: 42 }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8", padding: 0 }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>CONFIRM PASSWORD</label>
            <input
              name="confirm" type="password" value={form.confirm} onChange={handleChange}
              placeholder="Repeat your password" style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: "100%", height: 46,
            background: loading ? "#a5b4fc" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff", border: "none", borderRadius: 10,
            fontSize: 14, fontWeight: 700,
            cursor: loading ? "default" : "pointer",
          }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Login link */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#6366f1", fontWeight: 700, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}