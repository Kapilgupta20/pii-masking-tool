export const validateImage = (file) => {
  if (!file.type.startsWith("image/")) {
    return "Please upload a valid image file.";
  }
  if (file.size > 10 * 1024 * 1024) {
    return "File size must be less than 10MB.";
  }
  return null;
};

export const createDownloadLink = (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
