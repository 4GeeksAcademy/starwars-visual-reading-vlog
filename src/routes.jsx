import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";    // Named export
import Home from "./pages/Home";            // Default export (from your existing Home.jsx)
import { Single } from "./pages/Single";    // Named export
import { Demo } from "./pages/Demo";        // Named export ✅ Fixed

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);