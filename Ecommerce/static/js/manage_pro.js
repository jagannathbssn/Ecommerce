$(document).ready(function () {
  let table = $("#pro_table").DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: ajax_url,
      type: "GET",
    },
    columns: [
      { data: "sno" },
      { data: "name" },
      { data: "type" },
      { data: "price" },
      { data: "stock" },
      { data: "image" },
      { data: "operations" },
    ],
  });
});
