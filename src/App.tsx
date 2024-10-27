import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { TooltipProvider } from "./components/ui/tooltip";
import SuggestionPanel from "./pages/painel-de-sugestoes/SuggestionPanel";
import CreateSuggestionsAndCompanies from "./pages/painel-de-sugestoes/create/CreateSuggestionsAndCompanies"; // Página de criação
import ManageAll from "./pages/painel-de-sugestoes/gerenciar/ManageAll"; // Página de Gerenciamento de Empresas e Sugestões

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
                <TooltipProvider>
                  <SuggestionPanel />
                </TooltipProvider>
              }
            />

            {/* Página de Gerenciamento */}
            <Route path="gerenciar" element={<ManageAll />} />

            {/* Página para criar sugestões e empresas */}
            <Route path="create" element={<CreateSuggestionsAndCompanies />} />
          </Route>

          <Route index element={<Navigate to="/painel-de-sugestoes" />} />

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
