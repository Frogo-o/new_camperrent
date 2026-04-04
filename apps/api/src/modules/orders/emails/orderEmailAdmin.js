function inferKind(order) {
  const slugs = new Set(
    (order.items || [])
      .map((i) => i.categorySlug)
      .filter((x) => typeof x === "string" && x.trim().length > 0)
  );

  if (slugs.has("camper-rent")) return "RENT";
  if (slugs.has("buy-camper")) return "BUY";
  return "ACCESSORY";
}

function titleForKind(kind) {
  if (kind === "RENT") return "Нова заявка за наемане";
  if (kind === "BUY") return "Нова заявка за купуване";
  return "Нова поръчка";
}

function subjectForKind(kind, id) {
  if (kind === "RENT") return `Нова заявка за наемане #${id}`;
  if (kind === "BUY") return `Нова заявка за купуване #${id}`;
  return `Нова поръчка #${id}`;
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
    <h3 style="margin:16px 0 8px">Детайли за резервация</h3>

    <p style="margin:0 0 10px">
      ${order.rentalPlace ? `<b>Място на наемане:</b> ${order.rentalPlace}<br/>` : ""}
      ${order.rentalFrom ? `<b>От дата:</b> ${fmtDateTime(order.rentalFrom)}<br/>` : ""}
      ${order.rentalTo ? `<b>До дата:</b> ${fmtDateTime(order.rentalTo)}<br/>` : ""}
    </p>

    <p style="margin:0 0 10px">
      ${order.country ? `<b>Държава:</b> ${order.country}<br/>` : ""}
      ${order.city ? `<b>Град:</b> ${order.city}<br/>` : ""}
      ${order.postalCode ? `<b>ПК:</b> ${order.postalCode}<br/>` : ""}
      ${order.street ? `<b>Улица:</b> ${order.street}<br/>` : ""}
    </p>

    <p style="margin:0 0 10px">
      ${
        order.expectedMileageKm !== null && order.expectedMileageKm !== undefined
          ? `<b>Предполагаем пробег:</b> ${Number(order.expectedMileageKm)} км<br/>`
          : ""
      }
      ${order.visitCountries ? `<b>Държави за посещение:</b> ${order.visitCountries}<br/>` : ""}
    </p>

    ${
      accessories
        ? `<p style="margin:0 0 6px"><b>Аксесоари:</b></p>
           <pre style="margin:0; padding:10px; background:#f6f7f9; border:1px solid #e5e7eb; white-space:pre-wrap">${accessories}</pre>`
        : ""
    }
  `;
}

function orderEmailAdmin(order) {
  const kind = inferKind(order);

  const rows = (order.items || [])
    .map((i) => {
      const name = i.productName || "";
      const articleNumber = i.articleNumber || "";
      const qty = Number(i.qty || 0);

      if (kind === "RENT") {
        return `
          <tr>
            <td>
              <div>${name}</div>
              <div style="font-size:12px;color:#666;">Арт. №: ${articleNumber}</div>
            </td>
            <td>${qty}</td>
          </tr>
        `;
      }

      const price = (Number(i.price || 0) / 100).toFixed(2);
      const total = (Number(i.total || 0) / 100).toFixed(2);

      return `
        <tr>
          <td>
            <div>${name}</div>
            <div style="font-size:12px;color:#666;">Арт. №: ${articleNumber}</div>
          </td>
          <td>${qty}</td>
          <td>${price} €</td>
          <td>${total} €</td>
        </tr>
      `;
    })
    .join("");

  const totalEur = (Number(order.total || 0) / 100).toFixed(2);

  const tableHead =
    kind === "RENT"
      ? `
        <tr>
          <th>Продукт</th>
          <th>Кол.</th>
        </tr>
      `
      : `
        <tr>
          <th>Продукт</th>
          <th>Кол.</th>
          <th>Цена</th>
          <th>Общо</th>
        </tr>
      `;

  return `
    <h2>${titleForKind(kind)} #${order.id}</h2>

    <p>
      <b>Клиент:</b> ${order.customerName}<br/>
      <b>Email:</b> ${order.email}<br/>
      <b>Телефон:</b> ${order.phone}
    </p>

    <p><b>Адрес:</b> ${order.address}</p>

    ${renderReservationBlock(order)}

    <table border="1" cellpadding="6" cellspacing="0" style="margin-top:12px">
      <thead>${tableHead}</thead>
      <tbody>${rows}</tbody>
    </table>

    ${kind === "RENT" ? "" : `<p><b>Общо:</b> ${totalEur} €</p>`}

    ${order.note ? `<p><b>Бележка:</b> ${order.note}</p>` : ""}

    <p><b>Важно:</b> Свържете се с клиента до <b>2 работни дни</b> за уточнение.</p>
  `;
}

module.exports = { orderEmailAdmin, subjectForKind };
