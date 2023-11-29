async function loadXmlData() {
  let promise = await fetch("/familia.xml");

  if (!promise.ok) promise = await fetch("/menu-dinamic/js/menu_dinamic.json");

  let data = await promise.text();
  let xml = new window.DOMParser().parseFromString(data, "text/xml");

  return xml;
}

function showDocInTable(xml) {
  console.log(xml);
  const table = document.querySelector("#dataTable > tbody");
  const datasource = xml.querySelector("familia");
  const padre = datasource.querySelector("padre");
  const madre = datasource.querySelector("madre");
  const hijos = datasource.querySelectorAll("hijo");

  table.removeChild(table.children[0]);

  table.appendChild(tagsToRow(padre));
  table.appendChild(tagsToRow(madre));

  Array.from(hijos).map((hijo, i) => {
    table.appendChild(tagsToRow(hijo));
  });
}

function tagsToRow(entidad) {
  const tr = document.createElement("tr");
  const nombre = tagToData(entidad.querySelector("nombre"));
  const apellido1 = entidad.querySelectorAll("apellido")[0];
  const apellido2 = entidad.querySelectorAll("apellido")[1];
  const dni = tagToData(entidad.querySelector("dni") ?? "N/A");
  const edad = tagToData(entidad.querySelector("edad") ?? "N/A");

  const apellidos = document.createElement("td");
  apellidos.textContent = apellido1.textContent + " " + apellido2.textContent;

  tr.append(nombre, apellidos, dni, edad);

  return tr;
}

function tagToData(tag) {
  const td = document.createElement("td");
  td.textContent = tag === "N/A" ? tag : tag.textContent;
  return td;
}

window.onload = () => {
  loadXmlData().then(showDocInTable);
};
