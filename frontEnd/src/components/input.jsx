function Input({
  isInput = false,
  inputType,
  chackBox = false,
  isSelect = false,
  options = [],
  guidanceRequired /* משתנה שיאפשר להראות בטופס אופציית בחירות עם הנחיות למשתמש */,
  isTextArea = false,
  label,
  ...rest
}) {
  return (
    <div className="mb-3">
      {rest.error && (
        <div className="invalid-feedback d-block">{rest.error}</div>
      )}
      {/* עבור שדות צ'ק בוקס */}
      {chackBox && (
        <div>
          <label className="form-check-label">{label}</label>
          <input
            className="form-check-input 
              form-check-lg border 
              border-2 
              border-dark 
              mx-1"
            type="checkbox" // עבור צ'קבוקס
            id={rest.id}
            name={rest.name}
            {...rest} // אחראי לפיזור שאר הפרופס
          />
        </div>
      )}
      {/* עבור בחירה של אופציה אחת */}
      {isSelect && (
        <div>
          <label className="form-label" htmlFor={rest.id}>
            {rest.required && <span className="text-danger">*</span>}
            {label}
          </label>

          <select
            className={[
              "form-select",
              "border-2",
              "border-primary",
              rest.error && "is-invalid",
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          >
            {/* ניתן ערך אשר יסביר למשתמש שהוא צריך לבחור מתוך הרשימה */}
            <option value="" disabled>
              בחר/י...
            </option>
            {/* עבור קלט של אפשרוית שבו נדרשת הנחיות למשתמש */}
            {guidanceRequired
              ? options.map(({ value, hint }) => (
                  <option key={value} value={value}>
                    {`${value}: ${hint}`}
                  </option>
                ))
              : // עבור קלט של אפשרוית ללא מתן הנחיות למשתמש
                options.map((op) => <option value={op}>{op}</option>)}
          </select>
        </div>
      )}
      {/* עבור שדות קלט רגילים שצפוי להיות בהם ערך מספרי או סטרינגי */}
      {isInput && (
        <div>
          <label htmlFor={rest.id}>{label}</label>
          {rest.required && <span className="text-danger">*</span>}
          <input
            className={["form-control", rest.error && "is-invalid"]
              .filter(Boolean) // בדיקה האם יש שגיאה בשדה במידה ויש יצורף המחלקה שמסבירה על שגיאה בעזרת עיצוב
              .join(" ")}
            type={inputType}
            id={rest.id}
            name={rest.name}
            {...rest}
          />
        </div>
      )}
      {/* עבור שדות בהם יש פירוט רחב  */}
      {isTextArea && (
        <div className="mb-3">
          <label htmlFor={rest.id} className="form-label">
            {label}
          </label>
          <textarea
            id={rest.id}
            rows="10"
            className="form-control"
            {...rest}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default Input;
