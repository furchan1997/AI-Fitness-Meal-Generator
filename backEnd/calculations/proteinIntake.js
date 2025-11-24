// חישוב כמות החלבון שעל המשתמש לצרוך ביום
const proteinIntakeCulc = ({ target, weight }) => {
  if (target === "בריאות כללית") {
    return weight * 1.6;
  }

  if (target === "חיטוב") {
    return weight * 2.2;
  }

  if (target === "מסה") {
    return weight * 2;
  }
};

module.exports = { proteinIntakeCulc };
