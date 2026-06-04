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
import RoomInvoiceListPage from "../features/room/pages/RoomInvoiceListPage"
import InvoiceListPage from "../features/invoice/pages/InvoiceListPage"
import RoomBookingListPage from "../features/room/pages/RoomBookingListPage"
import BookingDetailPage from "../features/booking/pages/BookingDetailPage"
import RoomCreatePage from "../features/room/pages/RoomCreatePage"
import RoomUpdatePage from "../features/room/pages/RoomUpdatePage"
import AreaListPage from "../features/area/pages/AreaListPage"
import AreaDetailPage from "../features/area/pages/AreaDetailPage"
import AreaCreatePage from "../features/area/pages/AreaCreatePage"
import AreaUpdatePage from "../features/area/pages/AreaUpdatePage"
import ProductListPage from "../features/product/pages/ProductListPage"
import ProductDetailPage from "../features/product/pages/ProductDetailPage"
import ProductCreatePage from "../features/product/pages/ProductCreatePage"
import ProductUpdatePage from "../features/product/pages/ProductUpdatePage"
import ProductUpdateImagePage from "../features/product/pages/ProductUpdateImagePage"
import PointDiscountListPage from "../features/pointDiscount/pages/PointDiscountListPage"
import RevenueStatisticsPage from "../features/statistics/pages/RevenueStatisticsPage"
import MemberListPage from "../features/member/pages/MemberListPage"
import MemberDetailPage from "../features/member/pages/MemberDetailPage"
import EmployeeListPage from "../features/employee/pages/EmployeeListPage"
import EmployeeDetailPage from "../features/employee/pages/EmployeeDetailPage"
import EmployeeCreatePage from "../features/employee/pages/EmployeeCreatePage"

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
    {path: '/rooms/invoices/:roomId', page: RoomInvoiceListPage, layout: MainLayout},
    {path: '/invoices', page: InvoiceListPage, layout: MainLayout},
    {path: '/rooms/bookings/:roomId', page: RoomBookingListPage, layout: MainLayout},
    {path: '/bookings/detail/:bookingId', page: BookingDetailPage, layout: MainLayout},
    {path: '/rooms/create', page: RoomCreatePage, layout: MainLayout},
    {path: '/rooms/update/:roomId', page: RoomUpdatePage, layout: MainLayout},
    {path: '/areas', page: AreaListPage, layout: MainLayout},
    {path: '/areas/detail/:areaId', page: AreaDetailPage, layout: MainLayout},
    {path: '/areas/create', page: AreaCreatePage, layout: MainLayout},
    {path: '/areas/update/:areaId', page: AreaUpdatePage, layout: MainLayout},
    {path: '/products', page: ProductListPage, layout: MainLayout},
    {path: '/products/detail/:productId', page: ProductDetailPage, layout: MainLayout},
    {path: '/products/create', page: ProductCreatePage, layout: MainLayout},
    {path: '/products/update/:productId', page: ProductUpdatePage, layout: MainLayout},
    {path: '/products/updateImage/:productId', page: ProductUpdateImagePage, layout: MainLayout},
    {path: '/pointDiscounts', page: PointDiscountListPage, layout: MainLayout},
    {path: '/statistics', page: RevenueStatisticsPage, layout: MainLayout},
    {path: '/members', page: MemberListPage, layout: MainLayout},
    {path: '/members/detail/:memberAccountId', page: MemberDetailPage, layout: MainLayout},
    {path: '/employees', page: EmployeeListPage, layout: MainLayout},
    {path: '/employees/detail/:employeeId', page: EmployeeDetailPage, layout: MainLayout},
    {path: '/employees/create', page: EmployeeCreatePage, layout: MainLayout},
]

export { publicRoutes, privateRoutes }