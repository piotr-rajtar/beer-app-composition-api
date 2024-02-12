export const parseFilterTextValue = (text: string): string => {
  return text.replace(/\s+/g, '_');
};
