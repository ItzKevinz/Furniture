export function showSuccess(title, text) {
  return window.Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
    confirmButtonColor: "#16a34a",
  });
}

export function showError(title, text) {
  return window.Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "OK",
    confirmButtonColor: "#dc2626", 
  });
}

export function showConfirm(title, text) {
  return window.Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });
}

export function showToastSuccess(message) {
  return Swal.fire({
    toast: true,
    position: "top",
    icon: "success",
    title: "Berhasil menambahkan barang ke keranjang",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}