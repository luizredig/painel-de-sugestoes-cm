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
import CreateSuggestionsAndCompanies from "./pages/painel-de-sugestoes/create/CreateSuggestionsAndCompanies";
import ManageAll from "./pages/painel-de-sugestoes/gerenciar/ManageAll";
import { LoginPage } from "./pages/login/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import CreateSuggestionOnly from "./pages/painel-de-sugestoes/create/CreateSuggestionClient";

function App() {
  const { role, isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Página de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas protegidas */}
      <Route
        element={
          isAuthenticated ? (
            <Layout>
              <Outlet />
            </Layout>
          ) : (
            <Navigate to="/inicio" />
          )
        }
      >
        {/* Rotas acessíveis apenas para admin */}
        {role === "admin" && (
          <>
            <Route
              path="/painel-de-sugestoes/gerenciar"
              element={
                <ProtectedRoute>
                  <ManageAll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel-de-sugestoes/create"
              element={
                <ProtectedRoute>
                  <CreateSuggestionsAndCompanies />
                </ProtectedRoute>
              }
            />
          </>
        )}

        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <CreateSuggestionOnly />
            </ProtectedRoute>
          }
        />

        <Route
          path="/painel-de-sugestoes"
          element={
            <ProtectedRoute>
              <TooltipProvider>
                <SuggestionPanel />
              </TooltipProvider>
            </ProtectedRoute>
          }
        />

        {/* Redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to={"/inicio"} replace />} />
      </Route>
    </Routes>
  );
}

export default function AppWithAuth() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}
