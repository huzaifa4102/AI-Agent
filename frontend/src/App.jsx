// import ChatWindow from "./components/ChatWindow";

// function App() {
//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
//       <ChatWindow />
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;