export const convertFristCharUpperCase = (text: string) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
};
