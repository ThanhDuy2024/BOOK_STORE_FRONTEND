import { Outlet, Route, Routes, useNavigate } from "react-router"
import AdminLayouts from "../layouts/Layouts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/CategoriesMangement/Categories";
import Books from "../pages/BooksManagement/Books";
import Users from "../pages/UsersManagement/Users";
import Login from "../pages/Login/Login";
import { useContext, useEffect, useState } from "react";
import { callApi } from "../api/api";
import { AdminContext } from "../contexts/adminContext";
import { Toaster, toast } from 'sonner'

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { adminName, adminDispatch } = useContext(AdminContext);
    const [loginStatus, setLoginStatus] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await callApi("get", `${import.meta.env.VITE_REACT_APP_APIDEV}/admin/auth/profile`, {})
            if (res.status === true) {
                setLoginStatus(true);
                adminDispatch({
                    type: "ADMIN-PROFILE",
                    payload: {
                        id: res.data.id,
                        adminName: res.data.adminName,
                        fullName: res.data.fullName,
                        email: res.data.email,
                        address: res.data.address,
                        phone: res.data.phone,
                        image: res.data.image,
                        status: res.data.status,
                        roleId: res.data.roleId,
                    }
                })
            }
        })();
    }, []);

    if (loginStatus === false) {
        return navigate("/admin/login")
    };
    return <Outlet />
}

const RoutesList = () => {
    return (
        <>
            <Toaster position="top-right" richColors/>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayouts />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/category" element={<Categories />} />
                        <Route path="/admin/books" element={<Books />} />
                        <Route path="/admin/users" element={<Users />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default RoutesList;