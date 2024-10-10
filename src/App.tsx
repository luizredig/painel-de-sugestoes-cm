import { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";

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
            <Route index element={<BlogPostList />} />

            <Route path="create" element={<BlogPostCreate />} />

            <Route path="edit/:id" element={<BlogPostEdit />} />

            <Route path="show/:id" element={<BlogPostShow />} />
          </Route>

          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
