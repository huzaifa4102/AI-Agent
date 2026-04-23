// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div style={{
//         minHeight: "100vh", display: "flex",
//         alignItems: "center", justifyContent: "center",
//         fontFamily: "system-ui", background: "#f8fafc",
//       }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{
//             width: 44, height: 44, borderRadius: "50%",
//             border: "3px solid #e2e8f0", borderTopColor: "#6366f1",
//             animation: "spin .8s linear infinite", margin: "0 auto 14px",
//           }} />
//           <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>Checking auth...</p>
//           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//         </div>
//       </div>
//     );
//   }

//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }




import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "system-ui",
      }}>
        <div style={{ width: 200, height: 200 }}>
          <DotLottieReact
            src="https://lottie.host/76e0224b-046b-4264-92c1-9d72be9d6e31/tXiVXwOjCi.lottie"
            loop
            autoplay
          />
        </div>
        <p style={{
          color: "#94a3b8",
          fontSize: 14,
          fontWeight: 600,
          marginTop: 8,
        }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}