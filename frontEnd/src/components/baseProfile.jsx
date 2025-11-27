import React from "react";

function Profile({ profile, effectiveTarget }) {
  if (!profile) return null;

  const {
    fullName,
    gender,
    age,
    height,
    weight,
    bodyFat,
    activity,
    kosher,
    vegetarian,
    bmr,
    tdee,
    caloriIntake,
    proteinIntake,
    dangerZone,
    RecommendationByBodyFat,
    favoFoods,
    target,
  } = profile;

  return (
    <div className="container py-4" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* כרטיס פרופיל */}
          <div className="card shadow-sm">
            <div className="card-body">
              {/* כותרת */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 className="fw-bold mb-1">{fullName}</h4>

                  <div className="d-flex flex-column">
                    <small className="text-muted">
                      🎯 מטרה:{" "}
                      <span className="fw-semibold text-dark">{target}</span>
                    </small>

                    {effectiveTarget !== target && (
                      <small className="text-muted">
                        ✅ מטרה מומלצת:{" "}
                        <span className="fw-semibold text-success">
                          {effectiveTarget}
                        </span>
                      </small>
                    )}
                  </div>
                </div>

                <span className="badge bg-primary">{gender}</span>
              </div>

              <hr />

              {/* נתונים אישיים */}
              <h6 className="fw-bold mb-2">נתונים אישיים</h6>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">גיל</div>
                    <div className="fw-semibold">{age}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">גובה</div>
                    <div className="fw-semibold">{height} ס"מ</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">משקל</div>
                    <div className="fw-semibold">{weight} ק"ג</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">אחוז שומן</div>
                    <div className="fw-semibold">{bodyFat}%</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">רמת פעילות</div>
                    <div className="fw-semibold">{activity}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2 bg-light">
                    <div className="text-muted small">כשרות / צמחונות</div>
                    <div className="fw-semibold small">
                      {kosher ? "כשר ✔" : "לא כשר"} /{" "}
                      {vegetarian ? "צמחוני" : "לא צמחוני"}
                    </div>
                  </div>
                </div>
              </div>

              {/* נתונים תזונתיים */}
              <h6 className="fw-bold mb-2">נתונים תזונתיים</h6>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="border rounded p-2">
                    <div className="text-muted small">BMR</div>
                    <div className="fw-semibold">{bmr} קק"ל</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2">
                    <div className="text-muted small">TDEE</div>
                    <div className="fw-semibold">{tdee} קק"ל</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2">
                    <div className="text-muted small">
                      קלוריות יומיות מומלצות
                    </div>
                    <div className="fw-semibold">{caloriIntake} קק"ל</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="border rounded p-2">
                    <div className="text-muted small">חלבון יומי מומלץ</div>
                    <div className="fw-semibold">{proteinIntake} גרם</div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              {dangerZone && (
                <div className="alert alert-warning">
                  {RecommendationByBodyFat ||
                    "קיימת אינדיקציה למצב סיכון. מומלץ לשקול ייעוץ מקצועי."}
                </div>
              )}

              {/* מאכלים אהובים */}
              {favoFoods && (
                <p className="small text-muted">מאכלים אהובים: {favoFoods}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
