const params = window.location.href;
const orderUrl = new URL(params);
const orderId = orderUrl.searchParams.get("id");

document.querySelector("#orderId").innerHTML = orderId;