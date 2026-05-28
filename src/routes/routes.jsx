import { Fragment } from "react"
import LoginPage from "../features/auth/pages/LoginPage"

const publicRoutes = [
    {path: '/login', page: LoginPage, layout: Fragment},
]

const privateRoutes = []

export { publicRoutes, privateRoutes }