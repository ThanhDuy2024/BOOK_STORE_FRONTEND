import { Route, Routes } from "react-router"
import AdminLayouts from "../layouts/Layouts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/CategoriesMangement/Categories";
import Books from "../pages/BooksManagement/Books";
import Users from "../pages/UsersManagement/Users";
import Login from "../pages/Login/Login";
const RoutesList = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<Login/>}/>
            <Route element={<AdminLayouts/>}>
                <Route path="/admin/dashboard" element={<Dashboard/>}/>
                <Route path="/admin/category" element={<Categories/>}/>
                <Route path="/admin/books" element={<Books/>}/>
                <Route path="/admin/users" element={<Users/>}/>
            </Route>
        </Routes>
    )
}

export default RoutesList;