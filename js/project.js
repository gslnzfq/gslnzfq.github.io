$(".act-page").on("click", function (e) {
  var box = $(this);
  var href = box.data("href");
  e.stopPropagation();

  // 手机上直接打开页面，在电脑或者iPad上使用弹窗打开
  if (!navigator.userAgent.match(/(iPhone|Android)/gi)) {
    $("#openIframe").show().find("iframe").attr("src", href);
  } else {
    window.open(href);
  }
});

$("#openIframe").on("click", function () {
  $("#openIframe").hide();
});

if (navigator.userAgent.match(/huaweicol/gi)) {
  $("body").addClass("huawei");
}
