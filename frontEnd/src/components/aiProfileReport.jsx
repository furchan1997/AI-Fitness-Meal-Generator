import ReactMarkdown from "react-markdown";
//  רכיב אשר יראה למשתמש את הדו''ח בינה מלאכותית, מצבי שגיאה, המתנה וברירת המחדל
function AIProfileReport({
  loading,
  error,
  initialDisplay,
  aiReport = {},
  fullName,
}) {
  const createdAt = new Date().toLocaleTimeString("he-IL");
  // תצוגת טעינה מעוצבת + נגישות
  if (loading) {
    return (
      <div dir="rtl" className="card mt-3 w-100">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3" aria-live="polite">
            <div className="spinner-border" role="status" aria-busy="true">
              <span className="visually-hidden">מייצר דו״ח…</span>
            </div>
            <div>
              <h2 className="h6 mb-1">מייצר דו״ח…</h2>
              <p className="text-muted small mb-0">זה עשוי לארוך מספר שניות.</p>
            </div>
          </div>
          <hr className="my-3" />
          <div className="placeholder-glow">
            <span className="placeholder col-8 d-block mb-2"></span>
            <span className="placeholder col-6 d-block mb-2"></span>
            <span className="placeholder col-10 d-block mb-2"></span>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div dir="rtl" className="alert alert-danger my-3">
        {/* מצב שגיאה עם עיצוב מותאם והודעה שצפויה להגיע מהשרת */}
        שגיאה: {String(error)}
      </div>
    );
  }

  // בעת מצב בו יש דו''ח מוכן לתצוגה
  if (Object.keys(aiReport).length > 0) {
    return (
      <div dir="rtl" className="card mt-3 w-100">
        <div className="card-body">
          <h2 className="h4 mb-3">
            להלן דו״ח AI{fullName ? ` עבור ${fullName}` : ""}
          </h2>
          <h3 className="h6">דו״ח</h3>
          <ReactMarkdown>{String(aiReport)}</ReactMarkdown>
          <p className="text-muted small mt-3">נוצר בתאריך: {createdAt}</p>
        </div>
      </div>
    );
  }

  // Empty state (ברירת מחדל)
  return (
    <div dir="rtl" className="card mt-3 w-100">
      <div className="card-body">
        <h2 className="h5 mb-2">
          ממתינים לדו''ח שלך, אנא מלא/י את הפרטים וניצור בשבילך תפריט מותאם
          אישית
        </h2>
        <p className="text-muted mb-0">שלח/י פרופיל כדי לייצר דו״ח חדש.</p>
      </div>
    </div>
  );
}

export default AIProfileReport;
