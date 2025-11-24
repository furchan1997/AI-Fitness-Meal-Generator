const targetService = (target) => {
  if (target === "בריאות כללית") return "health";
  if (target === "חיטוב") return "cut";
  if (target === "מסה") return "mass";
  // return "health";
};

module.exports = { targetService };
