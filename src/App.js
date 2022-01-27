import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home/Home';
import SignIN from './pages/SignIN/SignIN/SignIN';
import AuthProvider from './Context/AuthProvider';
import SignUp from './pages/SignIN/SignUp/SignUp';
import NewBlog from './pages/Dashboard/NewBlog/NewBlog';
import PrivateRoute from './pages/SignIN/PrivateRoute/PrivateRoute';
import DashboardDrawer from './pages/Dashboard/DashboardDrawer/DashboardDrawer';
import MyBlogs from './pages/Dashboard/MyBlogs/MyBlogs';
import Payment from './pages/Dashboard/Payment/Payment';
import Review from './pages/Dashboard/Review/Review';
import ManageOrders from './pages/Dashboard/ManageOrders/ManageOrders';
import ManageProducts from './pages/Dashboard/ManageProducts/ManageProducts';
import MakeAdmin from './pages/Dashboard/MakeAdmin/MakeAdmin';
import AdminRoute from './pages/SignIN/AdminRoute/AdminRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardDrawer /></PrivateRoute>} >
              <Route path='/dashboard/myblogs' element={<MyBlogs />} />
              <Route path={`dashboard/payment`} element={<Payment />} />
              <Route path={`/dashboard/review`} element={<Review />} />
              <Route path={`dashboard/manage-orders`} element={<ManageOrders />} />
              <Route path={`dashboard/manage-products`} element={<ManageProducts />} />
              <Route path={`/dashboard/newblog`} element={<NewBlog />} />
              <Route path={`/dashboard/make-admin`} element={<AdminRoute> <MakeAdmin /></AdminRoute>} />
            </Route>
            <Route path="signin" element={<SignIN />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
