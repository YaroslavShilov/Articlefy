import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ArticlePage } from "./pages/ArticlePage";
import { SearchPage } from "./pages/SearchPage";
import { CreateArticle } from "./pages/CreateArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search/:title" element={<SearchPage />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="add-article" element={<CreateArticle />} />
        <Route path="*" element={<h2>page 404</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
