import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import DemoPage from "./pages/DemoPage";
import BestPracticesPage from "./pages/BestPracticesPage";
import ReferencesPage from "./pages/ReferencesPage";
// Playground imports
import {
  CardWrapper,
  CardWrapperSolved,
  // ProductsGrid, // Commented out - has incorrect Collection import
  FilterMenu,
  FilterMenuSolved,
  EdgeCases,
  EdgeCasesSolved,
  ECommIssues,
  AddToCartModal,
  AddToCartModalSolved,
  TreeList,
  TreeListSolved,
} from "./playground";

// Demo imports
import { DialogExample, PopoverDialogExample } from "./demos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route
          path="/"
          element={
            <Layout showHeader showFooter withLayout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/demo"
          element={
            <Layout showHeader showFooter withLayout>
              <DemoPage />
            </Layout>
          }
        />
        <Route
          path="/best-practices"
          element={
            <Layout showHeader showFooter withLayout>
              <BestPracticesPage />
            </Layout>
          }
        />
        <Route
          path="/references"
          element={
            <Layout showHeader showFooter withLayout>
              <ReferencesPage />
            </Layout>
          }
        />

        {/* Playground Routes */}
        <Route path="/playground/e-commerce" element={<ECommIssues />} />
        <Route path="/playground/card-wrapper" element={<CardWrapper />} />
        {/* <Route path="/playground/product-grid" element={<ProductsGrid />} /> */}
        {/* <Route path="/playground/grid-active-descendant" element={<GridActiveDescendant />} /> */}
        <Route path="/playground/filter-menu" element={<FilterMenu />} />
        <Route path="/playground/cart-modal" element={<AddToCartModal />} />
        <Route path="/playground/edge-cases" element={<EdgeCases />} />
        <Route path="/playground/tree-list" element={<TreeList />} />

        {/* Solved Routes */}
        <Route path="/solved/card-wrapper" element={<CardWrapperSolved />} />
        {/* <Route path="/solved/product-grid" element={<ProductsGridSolved />} /> */}
        <Route path="/solved/filter-menu" element={<FilterMenuSolved />} />
        <Route path="/solved/cart-modal" element={<AddToCartModalSolved />} />
        <Route path="/solved/edge-cases" element={<EdgeCasesSolved />} />
        <Route path="/solved/tree-list" element={<TreeListSolved />} />
        <Route path="/solved/e-commerce" element={<ECommercePage />} />

        {/* Demo Routes */}
        <Route path="/demos/overlay/dialog" element={<DialogExample />} />
        <Route path="/demos/overlay/popover" element={<PopoverDialogExample />} />
      </Routes>
    </Router>
  );
}

export default App;
