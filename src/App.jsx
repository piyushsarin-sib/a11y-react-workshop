import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExercisesPage from "./pages/ExercisesPage";
import DemoPage from "./pages/DemoPage";
import BestPracticesPage from "./pages/BestPracticesPage";
import ReferencesPage from "./pages/ReferencesPage";
// Playground imports
import {
  CardWrapper,
  CardWrapperSolved,
  ProductsGrid,
  FilterMenu,
  EdgeCases,
  EdgeCasesSolved,
  ECommIssues,
  AddToCartModal,
} from "./playground";

import {
  ProductsGrid as ProductsGridSolved,
  GridActiveDescendant,
  FilterMenu as FilterMenuSolved,
  AddToCartModal as AddToCartModalSolved,
} from "./solved";

// Demo imports
import {
  ListExample,
  HorizontalListExample,
  SingleSelectionExample,
  MultiSelectionExample,
  UncontrolledMenuExample,
  CollapsibleTreeExample,
  RovingIndexExample,
  MenuWithOverlay,
  DialogExample,
  PopoverDialogExample,
} from "./demos";

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
          path="/exercises"
          element={
            <Layout showHeader showFooter withLayout>
              <ExercisesPage />
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
        <Route path="/playground/product-grid" element={<ProductsGrid />} />
        <Route path="/playground/grid-active-descendant" element={<GridActiveDescendant />} />
        <Route path="/playground/filter-menu" element={<FilterMenu />} />
        <Route path="/playground/cart-modal" element={<AddToCartModal />} />
        <Route path="/playground/edge-cases" element={<EdgeCases />} />

        {/* Solved Routes */}
        <Route path="/solved/card-wrapper" element={<CardWrapperSolved />} />
        <Route path="/solved/product-grid" element={<ProductsGridSolved />} />
        <Route path="/solved/filter-menu" element={<FilterMenuSolved />} />
        <Route path="/solved/cart-modal" element={<AddToCartModalSolved />} />
        <Route path="/solved/edge-cases" element={<EdgeCasesSolved />} />
        <Route path="/solved/e-commerce" element={<ECommercePage />} />

        {/* Demo Routes */}
        <Route path="/demos/vertical-lists" element={<ListExample />} />
        <Route path="/demos/horizontal-lists" element={<HorizontalListExample />} />
        <Route path="/demos/single-select" element={<SingleSelectionExample />} />
        <Route path="/demos/multi-select" element={<MultiSelectionExample />} />
        <Route path="/demos/menu-skeleton" element={<UncontrolledMenuExample />} />
        <Route path="/demos/expansion" element={<CollapsibleTreeExample />} />
        <Route path="/demos/key-nav/roving-index" element={<RovingIndexExample />} />
        <Route path="/demos/overlay/menu" element={<MenuWithOverlay />} />
        <Route path="/demos/overlay/dialog" element={<DialogExample />} />
        <Route path="/demos/overlay/popover" element={<PopoverDialogExample />} />
      </Routes>
    </Router>
  );
}

export default App;
