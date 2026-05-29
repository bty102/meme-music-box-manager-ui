import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyInfo } from "./features/auth/store/authThunk";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

    const accessToken =
        useSelector(
            state =>
                state.auth.accessToken
        );

    useEffect(() => {

        if (accessToken) {
            dispatch(fetchMyInfo());
        }

    }, [accessToken]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {[
            ...publicRoutes.map((route, index) => {
              const Page = route.page;
              const Layout = route.layout;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            }),
            ...privateRoutes.map((route, index) => {
              const Page = route.page;
              const Layout = route.layout;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            }),
          ]}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
