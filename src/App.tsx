import { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            index
            element={<NavigateToResource resource="/painel-de-sugestoes" />}
          />

          <Route path="/painel-de-sugestoes">
            <Route index element={<></>} />

            <Route path="create" element={<></>} />

            <Route path="edit/:id" element={<></>} />

            <Route path="show/:id" element={<></>} />
          </Route>

          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
