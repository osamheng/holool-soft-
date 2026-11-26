import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/useAuth";
import starterPosts from "../data/blogData";
import {
  createBlogPost,
  deleteBlogPost,
  getEditorPosts,
  importStarterPosts,
  updateBlogPost,
} from "../lib/blogRepository";
import "./Admin.css";

function createEmptyForm() {
  return {
    title: "",
    slug: "",
    category: "تطوير الويب",
    excerpt: "",
    icon: "</>",
    author: "فريق حلول سوفت",
    intro: "",
    readingMinutes: 3,
    isPublished: false,
    sections: [{ heading: "", paragraphsText: "", pointsText: "" }],
  };
}

function makeSlug(value) {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function formFromPost(post) {
  return {
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
    icon: post.icon || "</>",
    author: post.author,
    intro: post.intro,
    readingMinutes: post.readingMinutes,
    isPublished: post.isPublished,
    sections: post.sections.map((section) => ({
      heading: section.heading || "",
      paragraphsText: (section.paragraphs || []).join("\n\n"),
      pointsText: (section.points || []).join("\n"),
    })),
  };
}

function formToPost(form, authorId) {
  const sections = form.sections
    .map((section) => ({
      heading: section.heading.trim(),
      paragraphs: section.paragraphsText
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      points: section.pointsText
        .split(/\r?\n/)
        .map((point) => point.trim())
        .filter(Boolean),
    }))
    .filter(
      (section) =>
        section.heading || section.paragraphs.length || section.points.length,
    );

  return {
    title: form.title.trim(),
    slug: makeSlug(form.slug),
    category: form.category.trim(),
    excerpt: form.excerpt.trim(),
    icon: form.icon.trim() || "</>",
    author: form.author.trim() || "فريق حلول سوفت",
    authorId,
    intro: form.intro.trim(),
    readingMinutes: Number(form.readingMinutes),
    isPublished: form.isPublished,
    sections,
  };
}

function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [listState, setListState] = useState({
    status: "loading",
    posts: [],
    error: "",
  });
  const [form, setForm] = useState(createEmptyForm);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => {
    let active = true;
    getEditorPosts()
      .then((posts) => {
        if (active) setListState({ status: "loaded", posts, error: "" });
      })
      .catch((error) => {
        if (active) {
          setListState({
            status: "error",
            posts: [],
            error: error.message,
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  async function refreshPosts() {
    setListState((current) => ({ ...current, status: "loading", error: "" }));
    try {
      const posts = await getEditorPosts();
      setListState({ status: "loaded", posts, error: "" });
    } catch (error) {
      setListState({ status: "error", posts: [], error: error.message });
    }
  }

  function startNewPost() {
    setForm(createEmptyForm());
    setEditingId(null);
    setSlugTouched(false);
    setEditorOpen(true);
    setNotice("");
    setActionError("");
  }

  function startEditing(post) {
    setForm(formFromPost(post));
    setEditingId(post.id);
    setSlugTouched(true);
    setEditorOpen(true);
    setNotice("");
    setActionError("");
  }

  function updateSection(index, field, value) {
    setForm((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index
          ? { ...section, [field]: value }
          : section,
      ),
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setActionError("");
    setNotice("");
    const post = formToPost(form, user.id);
    if (!post.slug) {
      setActionError("أدخل عنوانًا صالحًا لإنشاء رابط المقال.");
      return;
    }
    if (post.sections.length === 0) {
      setActionError("أضف قسمًا واحدًا على الأقل إلى محتوى المقال.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, post);
        setNotice("تم حفظ تعديلات المقال.");
      } else {
        await createBlogPost(post, user.id);
        setNotice(post.isPublished ? "تم نشر المقال." : "تم حفظ المقال كمسودة.");
      }
      setEditorOpen(false);
      setEditingId(null);
      setForm(createEmptyForm());
      await refreshPosts();
    } catch (error) {
      setActionError(error.message || "تعذر حفظ المقال.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePublishToggle(post) {
    setActionError("");
    setNotice("");
    const isPublishing = !post.isPublished;
    try {
      await updateBlogPost(post.id, {
        ...post,
        isPublished: isPublishing,
      }, isPublishing ? new Date().toISOString() : undefined);
      setNotice(isPublishing ? "تم نشر المقال." : "أعيد المقال إلى المسودات.");
      await refreshPosts();
    } catch (error) {
      setActionError(error.message || "تعذر تحديث حالة المقال.");
    }
  }

  async function handleDelete(post) {
    setActionError("");
    setNotice("");
    try {
      await deleteBlogPost(post.id);
      setDeleteCandidate(null);
      setNotice("تم حذف المقال.");
      await refreshPosts();
    } catch (error) {
      setActionError(error.message || "تعذر حذف المقال.");
    }
  }

  async function handleImportStarters() {
    setActionError("");
    setNotice("");
    try {
      const importedCount = await importStarterPosts(user.id, listState.posts);
      setNotice(
        importedCount
          ? `تمت إضافة ${importedCount} من المقالات الأولية.`
          : "المقالات الأولية موجودة بالفعل.",
      );
      await refreshPosts();
    } catch (error) {
      setActionError(error.message || "تعذر إضافة المقالات الأولية.");
    }
  }

  async function handleSignOut() {
    setActionError("");
    try {
      await signOut();
    } catch (error) {
      setActionError(error.message || "تعذر تسجيل الخروج.");
    }
  }

  const missingStarterCount =
    listState.status === "loaded"
      ? starterPosts.filter(
          (starter) =>
            !listState.posts.some((post) => post.slug === starter.slug),
        ).length
      : 0;

  return (
    <section className="admin-page">
      <div className="container admin-dashboard">
        <header className="admin-dashboard-header">
          <div>
            <span className="section-kicker">إدارة المحتوى</span>
            <h1>مساحة المحررين</h1>
            <p>مسجل الدخول: {user.email}</p>
          </div>
          <div className="admin-header-actions">
            <Link className="button button-outline" to="/blog">
              عرض المدونة
            </Link>
            <button
              className="button button-quiet"
              type="button"
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </button>
          </div>
        </header>

        {notice && (
          <p className="admin-notice" role="status">
            {notice}
          </p>
        )}
        {actionError && (
          <p className="admin-error" role="alert">
            {actionError}
          </p>
        )}

        {listState.status === "error" && (
          <div className="admin-error-card" role="alert">
            <strong>تعذر تحميل مقالات المدونة</strong>
            <p>{listState.error}</p>
            <p>
              تأكد من تشغيل <code>supabase/schema.sql</code> في مشروع Supabase
              ومن صحة إعدادات البيئة.
            </p>
            <button
              className="button button-outline"
              type="button"
              onClick={refreshPosts}
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {listState.status === "loading" && (
          <div className="admin-message">جارٍ تحميل المقالات...</div>
        )}

        {listState.status === "loaded" && (
          <>
            <div className="admin-toolbar">
              <div>
                <h2>المقالات</h2>
                <span>{listState.posts.length} مقال في لوحة التحرير</span>
              </div>
              <div className="admin-header-actions">
                {missingStarterCount > 0 && (
                  <button
                    className="button button-outline"
                    type="button"
                    onClick={handleImportStarters}
                  >
                    إضافة المقالات الأولية ({missingStarterCount})
                  </button>
                )}
                <button
                  className="button button-primary"
                  type="button"
                  onClick={startNewPost}
                >
                  كتابة مقال جديد <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>

            {editorOpen && (
              <form className="admin-editor" onSubmit={handleSave}>
                <div className="admin-editor-heading">
                  <h2>{editingId ? "تعديل المقال" : "مقال جديد"}</h2>
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={() => setEditorOpen(false)}
                  >
                    إغلاق
                  </button>
                </div>
                <div className="admin-form-grid">
                  <label>
                    عنوان المقال
                    <input
                      required
                      value={form.title}
                      onChange={(event) => {
                        const title = event.target.value;
                        setForm((current) => ({
                          ...current,
                          title,
                          slug: slugTouched ? current.slug : makeSlug(title),
                        }));
                      }}
                    />
                  </label>
                  <label>
                    رابط المقال (slug)
                    <input
                      dir="ltr"
                      required
                      value={form.slug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        setForm((current) => ({
                          ...current,
                          slug: event.target.value,
                        }));
                      }}
                    />
                  </label>
                  <label>
                    التصنيف
                    <input
                      required
                      value={form.category}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    اسم الكاتب
                    <input
                      required
                      value={form.author}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          author: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="admin-form-wide">
                    ملخص المقال
                    <textarea
                      required
                      rows="2"
                      value={form.excerpt}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          excerpt: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="admin-form-wide">
                    المقدمة
                    <textarea
                      required
                      rows="3"
                      value={form.intro}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          intro: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    مدة القراءة بالدقائق
                    <input
                      type="number"
                      min="1"
                      max="120"
                      required
                      value={form.readingMinutes}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          readingMinutes: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    الرمز المختصر للبطاقة
                    <input
                      value={form.icon}
                      maxLength="8"
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          icon: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="admin-sections-editor">
                  <div className="admin-editor-heading">
                    <h3>محتوى المقال</h3>
                    <button
                      className="button button-outline"
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          sections: [
                            ...current.sections,
                            { heading: "", paragraphsText: "", pointsText: "" },
                          ],
                        }))
                      }
                    >
                      إضافة قسم
                    </button>
                  </div>
                  {form.sections.map((section, index) => (
                    <fieldset className="admin-section-editor" key={index}>
                      <legend>القسم {index + 1}</legend>
                      <label>
                        عنوان القسم
                        <input
                          value={section.heading}
                          onChange={(event) =>
                            updateSection(index, "heading", event.target.value)
                          }
                        />
                      </label>
                      <label>
                        الفقرات (اترك سطرًا فارغًا بين كل فقرة)
                        <textarea
                          rows="5"
                          value={section.paragraphsText}
                          onChange={(event) =>
                            updateSection(
                              index,
                              "paragraphsText",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                      <label>
                        نقاط اختيارية (نقطة واحدة في كل سطر)
                        <textarea
                          rows="3"
                          value={section.pointsText}
                          onChange={(event) =>
                            updateSection(index, "pointsText", event.target.value)
                          }
                        />
                      </label>
                      {form.sections.length > 1 && (
                        <button
                          className="admin-remove-section"
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              sections: current.sections.filter(
                                (_item, sectionIndex) => sectionIndex !== index,
                              ),
                            }))
                          }
                        >
                          حذف القسم
                        </button>
                      )}
                    </fieldset>
                  ))}
                </div>

                <label className="admin-publish-toggle">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        isPublished: event.target.checked,
                      }))
                    }
                  />
                  نشر المقال فور الحفظ
                </label>
                <div className="admin-form-actions">
                  <button
                    className="button button-primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting
                      ? "جارٍ الحفظ..."
                      : editingId
                        ? "حفظ التعديلات"
                        : "حفظ المقال"}
                  </button>
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={() => setEditorOpen(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}

            {listState.posts.length === 0 ? (
              <div className="admin-empty-state">
                <h2>لا توجد مقالات في قاعدة البيانات بعد</h2>
                <p>
                  أضف المقالات الأولية أو ابدأ بكتابة مقال جديد. يمكنك حفظ
                  المقالات كمسودات قبل نشرها.
                </p>
              </div>
            ) : (
              <div className="admin-post-list">
                {listState.posts.map((post) => {
                  const canEdit = post.authorId === user.id;
                  return (
                    <article className="admin-post-row" key={post.id}>
                      <div className="admin-post-info">
                        <div className="admin-post-status">
                          <span
                            className={
                              post.isPublished
                                ? "admin-status is-published"
                                : "admin-status"
                            }
                          >
                            {post.isPublished ? "منشور" : "مسودة"}
                          </span>
                          <span>{post.category}</span>
                        </div>
                        <h3>{post.title}</h3>
                        <span className="admin-post-date">
                          {post.publishedLabel} · {post.author}
                        </span>
                      </div>
                      {canEdit ? (
                        <div className="admin-post-actions">
                          {deleteCandidate === post.id ? (
                            <>
                              <span>تأكيد حذف المقال؟</span>
                              <button
                                className="admin-danger-button"
                                type="button"
                                onClick={() => handleDelete(post)}
                              >
                                نعم، احذف
                              </button>
                              <button
                                className="admin-text-button"
                                type="button"
                                onClick={() => setDeleteCandidate(null)}
                              >
                                إلغاء
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="admin-text-button"
                                type="button"
                                onClick={() => startEditing(post)}
                              >
                                تعديل
                              </button>
                              <button
                                className="admin-text-button"
                                type="button"
                                onClick={() => handlePublishToggle(post)}
                              >
                                {post.isPublished ? "إلغاء النشر" : "نشر"}
                              </button>
                              <button
                                className="admin-danger-button"
                                type="button"
                                onClick={() => setDeleteCandidate(post.id)}
                              >
                                حذف
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="admin-post-date">مقال لمحرر آخر</span>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
