import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";

function App() {
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
                    <Layout>
                      <Page />
                    </Layout>
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
