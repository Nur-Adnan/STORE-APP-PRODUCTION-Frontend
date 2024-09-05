import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";
import Cart from "./pages/CartPage";
import Bills from "./pages/Bills";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/items" element={<PrivateRoute><Items /></PrivateRoute>} />
          <Route path="/bills" element={<PrivateRoute><Bills /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

export function PrivateRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
