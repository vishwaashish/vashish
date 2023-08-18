import toast from "react-hot-toast";

export const copyText = async (text: string) => {
  return await navigator.clipboard.writeText(text).then((val) => {
    toast.success("Copied to clipboard!", {
      id: text,
    });
  });
};
