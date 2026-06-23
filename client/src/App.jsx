import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { syncAuth } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync auth from localStorage when app starts
    dispatch(syncAuth());

    // Track visitor silently in the background
    try {
      fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/common/track-visit`, {
        method: "POST",
      }).catch(err => console.error("Visitor tracking failed silently"));
    } catch (error) {
      // Ignore errors
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
