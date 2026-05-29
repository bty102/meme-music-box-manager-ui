import { Fragment } from "react"
import LoginPage from "../features/auth/pages/LoginPage"
import MyInfoPage from "../features/auth/pages/MyInfoPage"
import MainLayout from "../layouts/MainLayout/MainLayout"

const publicRoutes = [
    {path: '/login', page: LoginPage, layout: Fragment},
]

const privateRoutes = [
    {path: '/me', page: MyInfoPage, layout: MainLayout},
]

export { publicRoutes, privateRoutes }