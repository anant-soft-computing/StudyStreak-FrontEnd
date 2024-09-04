export const getBackgroundColor = (band) => {
  if (band >= 8) return "#86e9a9";
  if (band >= 6.5) return "#f7cb5e";
  if (band >= 6) return "#ff4d4d";
  if (band >= 4.5) return "#24d9d9";
  return "#dcdcdc";
};
