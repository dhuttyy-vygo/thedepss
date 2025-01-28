$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    format: "dd-mm-yyyy",
    autoHide: true
  });
  if (window.innerWidth < 768) {
    $('[data-toggle="datepicker"]').attr("readonly", "readonly");
  }
});
