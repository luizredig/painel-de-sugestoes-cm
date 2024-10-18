import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import PainelDeSugestoes from "./pages/painel-de-sugestoes/PainelDeSugestoes";
import CreateSuggestion from "./pages/painel-de-sugestoes/create/CreateSuggestion";
import ManageSuggestions from "./pages/painel-de-sugestoes/gerenciar/ManageSuggestions";

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
          <Route index element={<Navigate to="/painel-de-sugestoes" />} />

          <Route path="/painel-de-sugestoes">
            <Route
              index
              element={
                <>
                  <PainelDeSugestoes />
                </>
              }
            />

            <Route
              path="gerenciar"
              element={
                <>
                  <ManageSuggestions />
                </>
              }
            />

            <Route
              path="create"
              element={
                <>
                  <CreateSuggestion />
                </>
              }
            />

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
