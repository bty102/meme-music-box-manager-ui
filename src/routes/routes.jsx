import { Fragment } from "react"
import LoginPage from "../features/auth/pages/LoginPage"
import MyInfoPage from "../features/auth/pages/MyInfoPage"
import MainLayout from "../layouts/MainLayout/MainLayout"
import RoomListPage from "../features/room/pages/RoomListPage"
import RoomDetailPage from "../features/room/pages/RoomDetailPage"

const publicRoutes = [
    {path: '/login', page: LoginPage, layout: Fragment},
]

const privateRoutes = [
    {path: '/me', page: MyInfoPage, layout: MainLayout},
    {path: '/rooms', page: RoomListPage, layout: MainLayout},
    {path: '/rooms/detail/:id', page: RoomDetailPage, layout: MainLayout},
]

export { publicRoutes, privateRoutes }