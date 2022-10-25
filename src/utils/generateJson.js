export const generateJson = (contenido, nombre) => {
  const anchor = document.createElement("a");
  const file = new File([contenido], "products.json", {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  anchor.href = url;
  anchor.download = nombre || "purchase.json";
  anchor.click();
  URL.revokeObjectURL(url);
};
