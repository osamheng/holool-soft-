import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import "./Admin.css";

function AdminLogin() {
  const { user, loading, error: sessionError, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <section className="admin-page">
        <div className="container admin-message-card" role="status">
          <span className="section-kicker">إعداد المدونة</span>
          <h1>لوحة المحررين تحتاج إلى ربط Supabase</h1>
          <p>
            أضف رابط المشروع ومفتاحه العام إلى ملف <code>.env.local</code>،
            وشغّل تعليمات قاعدة البيانات الموجودة في <code>supabase/schema.sql</code>.
          </p>
          <Link className="button button-outline" to="/blog">
            العودة إلى المدونة
          </Link>
        </div>
      </section>
    );
  }
  if (loading) {
    return (
      <section className="admin-page">
        <div className="container admin-message">جارٍ التحقق من تسجيل الدخول...</div>
      </section>
    );
  }
  if (user) return <Navigate to="/admin" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch (loginError) {
      setError(loginError.message || "تعذر تسجيل الدخول. تحقق من بيانات الحساب.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="admin-page">
      <div className="container admin-login-layout">
        <div className="admin-login-intro">
          <span className="section-kicker">مساحة خاصة</span>
          <h1>تسجيل دخول المحررين</h1>
          <p>سجّل الدخول لإضافة المقالات ومراجعتها وإدارة ما يظهر في المدونة.</p>
        </div>
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <h2>دخول لوحة التحرير</h2>
          {sessionError && (
            <p className="admin-error" role="alert">
              تعذر التحقق من جلسة الدخول: {sessionError}
            </p>
          )}
          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}
          <label>
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            كلمة المرور
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button
            className="button button-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
          <p className="admin-login-note">
            الحسابات ينشئها مدير المشروع من Supabase؛ لا يوجد تسجيل عام للمحررين.
          </p>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
