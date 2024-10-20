// src/App.tsx

import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout.tsx";
import SuggestionPanel from "./pages/painel-de-sugestoes/SuggestionPanel.tsx";
import CreateSuggestion from "./pages/painel-de-sugestoes/create/CreateSuggestion.tsx";
import ManageSuggestions from "./pages/painel-de-sugestoes/gerenciar/ManageSuggestions.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

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

            <Route path="gerenciar" element={<ManageSuggestions />} />

            <Route path="create" element={<CreateSuggestion />} />

            <Route path="edit/:id" element={<div>Editar Sugestão</div>} />

            <Route path="show/:id" element={<div>Detalhes da Sugestão</div>} />
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
