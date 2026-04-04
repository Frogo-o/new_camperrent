function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  }[c]));
}

function customerTitle(kind) {
  if (kind === "RENT") return "Благодарим за вашата заявка за наемане!";
  if (kind === "BUY") return "Благодарим за вашата заявка за купуване!";
  return "Благодарим за вашата поръчка!";
}

function subjectForCustomerKind(kind, id) {
  if (kind === "RENT") return `Заявката ви за наемане #${id} е получена`;
  if (kind === "BUY") return `Заявката ви за купуване #${id} е получена`;
  return `Вашата поръчка #${id} е получена`;
}

function introText(kind) {
  if (kind === "RENT") return "Изпратили сте заявка за <b>наемане</b>.";
  if (kind === "BUY") return "Изпратили сте заявка за <b>купуване</b>.";
  return "Получихме вашата поръчка.";
}

function fmtDateTime(d) {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(dt.getDate())}.${pad(dt.getMonth() + 1)}.${dt.getFullYear()} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

function renderReservationBlock(order) {
  const hasAny =
    order.rentalPlace ||
    order.rentalFrom ||
    order.rentalTo ||
    order.country ||
    order.city ||
    order.postalCode ||
    order.street ||
    (order.expectedMileageKm !== null && order.expectedMileageKm !== undefined) ||
    order.visitCountries ||
    order.rentalAccessories;

  if (!hasAny) return "";

  const accessories = String(order.rentalAccessories || "").trim();

  return `
    <div style="margin:12px 0 0; padding:12px; border:1px solid #e5e7eb; background:#fafafa">
      <div style="font-weight:700; margin:0 0 8px">Детайли за резервация</div>

      ${order.rentalPlace ? `<div><b>Място на наемане:</b> ${esc(order.rentalPlace)}</div>` : ""}
      ${order.rentalFrom ? `<div><b>От дата:</b> ${esc(fmtDateTime(order.rentalFrom))}</div>` : ""}
      ${order.rentalTo ? `<div><b>До дата:</b> ${esc(fmtDateTime(order.rentalTo))}</div>` : ""}

      ${order.country ? `<div style="margin-top:8px"><b>Държава:</b> ${esc(order.country)}</div>` : ""}
      ${order.city ? `<div><b>Град:</b> ${esc(order.city)}</div>` : ""}
      ${order.postalCode ? `<div><b>ПК:</b> ${esc(order.postalCode)}</div>` : ""}
      ${order.street ? `<div><b>Улица:</b> ${esc(order.street)}</div>` : ""}

      ${
        order.expectedMileageKm !== null && order.expectedMileageKm !== undefined
          ? `<div style="margin-top:8px"><b>Предполагаем пробег:</b> ${esc(Number(order.expectedMileageKm))} км</div>`
          : ""
      }
      ${order.visitCountries ? `<div><b>Държави за посещение:</b> ${esc(order.visitCountries)}</div>` : ""}

      ${
        accessories
          ? `<div style="margin-top:8px"><b>Аксесоари:</b></div>
             <div style="margin-top:6px; padding:10px; background:#fff; border:1px solid #e5e7eb; white-space:pre-wrap">${esc(accessories)}</div>`
          : ""
      }
    </div>
  `;
}

function orderEmailCustomer(order) {
  const slugs = new Set(
    (order.items || [])
      .map((i) => i.categorySlug)
      .filter((x) => typeof x === "string" && x.trim().length > 0)
  );

  const kind = slugs.has("camper-rent")
    ? "RENT"
    : slugs.has("buy-camper")
    ? "BUY"
    : "ACCESSORY";

  const rows = (order.items || [])
    .map((i) => {
      const name = esc(i.productName);
      const qty = esc(i.qty);
      const articleNumber = esc(i.articleNumber);
      return `<li>${name} × ${qty} <span style="color:#666;font-size:12px">(Арт. №: ${articleNumber})</span></li>`;
    })
    .join("");

  const totalEur = (Number(order.total || 0) / 100).toFixed(2);

  return `
  <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.45">
    <h2 style="margin:0 0 12px">${esc(customerTitle(kind))}</h2>

    <p style="margin:0 0 10px">Здравейте, ${esc(order.customerName)},</p>

    <p style="margin:0 0 10px">
      ${introText(kind)}
      Номер на заявката/поръчката: <b>#${esc(order.id)}</b>.
    </p>

    ${renderReservationBlock(order)}

    <p style="margin:12px 0 6px"><b>Артикули:</b></p>
    <ul style="margin:0 0 12px; padding-left:18px">${rows || "<li>(няма артикули)</li>"}</ul>

    ${kind === "RENT" ? "" : `<p style="margin:0 0 10px"><b>Обща сума:</b> ${esc(totalEur)} €</p>`}

    <p style="margin:0 0 12px">
      Наш служител ще се свърже с вас на телефон <b>${esc(order.phone)}</b>
      до <b>2 работни дни</b> за уточнение.
    </p>

    <p style="margin:0">
      Поздрави,<br/>
      <b>CamperRent</b>
    </p>
  </div>
  `;
}

module.exports = { orderEmailCustomer, subjectForCustomerKind };
