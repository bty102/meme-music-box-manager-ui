import { Fragment } from "react"
import LoginPage from "../features/auth/pages/LoginPage"
import MyInfoPage from "../features/auth/pages/MyInfoPage"
import MainLayout from "../layouts/MainLayout/MainLayout"
import RoomListPage from "../features/room/pages/RoomListPage"
import RoomDetailPage from "../features/room/pages/RoomDetailPage"
import InvoiceMemberUpdatePage from "../features/invoice/pages/InvoiceMemberUpdatePage"
import InvoiceProductUpdatePage from "../features/invoice/pages/InvoiceProductUpdatePage"
import RoomTransferListPage from "../features/room/pages/RoomTransferListPage"
import InvoiceDetailPage from "../features/invoice/pages/InvoiceDetailPage"

const publicRoutes = [
    {path: '/login', page: LoginPage, layout: Fragment},
]

const privateRoutes = [
    {path: '/me', page: MyInfoPage, layout: MainLayout},
    {path: '/rooms', page: RoomListPage, layout: MainLayout},
    {path: '/rooms/detail/:id', page: RoomDetailPage, layout: MainLayout},
    {path: '/invoices/update/member/:invoiceId', page: InvoiceMemberUpdatePage, layout: MainLayout},
    {path: '/invoices/update/product/:invoiceId', page: InvoiceProductUpdatePage, layout: MainLayout},
    {path: '/invoices/transfer/:invoiceId', page: RoomTransferListPage, layout: MainLayout},
    {path: '/invoices/detail/:invoiceId', page: InvoiceDetailPage, layout: MainLayout},
]

export { publicRoutes, privateRoutes }