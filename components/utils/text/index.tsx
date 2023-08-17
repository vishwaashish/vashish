export const copyText = async (text: string) => {
  return await navigator.clipboard.writeText(text);
};
