import {RouterProvider, createBrowserRouter, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login, {
  action as authAction,
} from "./Login";
import Register, {
  action as registerAction,
} from "./Register";
import Account from "./Account";
import RentalHistory from "./RentalHistory";
import "./css/App.css";
import { checkAuthLoader } from "./util/auth";
import { action as logoutAction } from './Logout.js';

function App() {
  const router = createBrowserRouter([
   
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
        action: authAction,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/account",
        element: <Account />,
        loader: checkAuthLoader,
      },
      {
        path: "/rentals",
        element: <RentalHistory />
        //Todo: once it's working add: loader: checkAuthLoader,
      },
      {
        path: "/logout",
        loader: logoutAction,
      },
    

  ]);
  return (
    
    <div className="App">
      <RouterProvider router={router} />
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/rentals" element={<RentalHistory />}></Route>
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
