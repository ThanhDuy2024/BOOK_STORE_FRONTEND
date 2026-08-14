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
import { CreateBook } from "../pages/BooksManagement/CreateBook";
import { CreateUsers } from "../pages/UsersManagement/CreateUsers";
import { EditBook } from "../pages/BooksManagement/EditBook";
import { EditUsers } from "../pages/UsersManagement/EditUsers";
import { LayoutClient } from "../layouts/LayoutsClient";
import { Home } from "../pages/Home/Home";
import { BookDetail } from "../pages/BooksClient/BooksDetail";

const ProtectedAdminRoute = () => {
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
            <Toaster position="top-right" richColors />
            <Routes>
                <Route element={<LayoutClient/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/book/detail/:id" element={<BookDetail/>}/>
                </Route>
                <Route path="/admin/login" element={<Login />} />
                <Route element={<ProtectedAdminRoute />}>
                    <Route element={<AdminLayouts />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/category" element={<Categories />} />
                        <Route path="/admin/books" element={<Books />} />
                        <Route path="/admin/books/create" element={<CreateBook />} />
                        <Route path="/admin/books/edit/:id" element={<EditBook />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/users/create" element={<CreateUsers />} />
                        <Route path="/admin/users/edit/:id" element={<EditUsers />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default RoutesList;