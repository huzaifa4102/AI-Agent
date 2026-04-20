import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
 };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "20px",
    }}>

      {/* Card */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "44px 40px",
        width: "100%",
        maxWidth: 420,
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
            Welcome back
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
            Sign in to DS Technologies Dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 10, padding: "10px 14px",
            marginBottom: 20, fontSize: 13, color: "#dc2626",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, letterSpacing: ".3px" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              style={{
                width: "100%", padding: "11px 14px",
                border: "1.5px solid #e2e8f0", borderRadius: 10,
                fontSize: 14, color: "#0f172a", background: "#f8fafc",
                outline: "none", transition: "border .2s",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, letterSpacing: ".3px" }}>
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%", padding: "11px 42px 11px 14px",
                  border: "1.5px solid #e2e8f0", borderRadius: 10,
                  fontSize: 14, color: "#0f172a", background: "#f8fafc",
                  outline: "none", transition: "border .2s",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: 16, color: "#94a3b8",
                  padding: 0,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", height: 46,
              background: loading ? "#a5b4fc" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 700, cursor: loading ? "default" : "pointer",
              transition: "all .2s", letterSpacing: ".3px",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <div style={{ marginTop: 24, padding: "16px", background: "#f8fafc", borderRadius: 10, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
            Admin access only · DS Technologies Pvt. Limited
          </p>
        </div>

        {/* Signup link */}
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#64748b" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#6366f1", fontWeight: 700, textDecoration: "none" }}>
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}