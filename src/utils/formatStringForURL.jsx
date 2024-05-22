export const formatStringForURL = (string) => {
  return string.toLowerCase().replace(/ /g, "-");
};

export const formatNormalString = (string) => {
  return string.replace(/-/g, " ");
}