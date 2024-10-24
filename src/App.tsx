import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import SuggestionPanel from "./pages/painel-de-sugestoes/SuggestionPanel";
import CreateSuggestion from "./pages/painel-de-sugestoes/create/CreateSuggestion";
import ManageSuggestions from "./pages/painel-de-sugestoes/gerenciar/ManageSuggestions";
import { TooltipProvider } from "./components/ui/tooltip";
import CompaniesView from "./pages/companies/CompaniesView";

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
                  <TooltipProvider>
                    <SuggestionPanel />
                  </TooltipProvider>
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

          <Route index element={<Navigate to="/painel-de-sugestoes" />} />

          <Route path="/empresas">
            <Route index element={<CompaniesView />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/painel-de-sugestoes" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
