import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { isSupabaseConfigured } from "../lib/supabaseClient";

function RequireEditor({ children }) {
  const { user, loading, error } = useAuth();

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />;
  }
  if (loading) {
    return (
      <section className="admin-page">
        <div className="container admin-message">جارٍ التحقق من تسجيل الدخول...</div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="admin-page">
        <div className="container admin-message" role="alert">
          تعذر التحقق من جلسة الدخول: {error}
        </div>
      </section>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
}

export default RequireEditor;
