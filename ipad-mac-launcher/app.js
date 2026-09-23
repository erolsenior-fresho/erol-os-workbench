import { APPS, CATEGORIES } from "./apps-data.js";

const CUSTOM_APPS_KEY = "erol-os-custom-apps";
const FAVORITES_KEY = "erol-os-favorites";
const RUNNING_KEY = "erol-os-running";

const elements = {
  appGrid: document.querySelector("#appGrid"),
  categoryList: document.querySelector("#categoryList"),
  categorySelect: document.querySelector("#categorySelect"),
  contentTitle: document.querySelector("#contentTitle"),
  windowTitle: document.querySelector("#windowTitle"),
  resultCount: document.querySelector("#resultCount"),
  emptyState: document.querySelector("#emptyState"),
  searchInput: document.querySelector("#searchInput"),
  systemDock: document.querySelector("#systemDock"),
  editButton: document.querySelector("#editButton"),
  addButton: document.querySelector("#addButton"),
  installButton: document.querySelector("#installButton"),
  aboutButton: document.querySelector("#aboutButton"),
  appDialog: document.querySelector("#appDialog"),
  installDialog: document.querySelector("#installDialog"),
  appForm: document.querySelector("#appForm"),
  menuClock: document.querySelector("#menuClock"),
  toast: document.querySelector("#toast")
};

const loadJSON = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

let customApps = loadJSON(CUSTOM_APPS_KEY, []);
let favorites = new Set(loadJSON(FAVORITES_KEY, APPS.filter((app) => app.favorite).map((app) => app.id)));
let activeCategory = "Favoriler";
let editing = false;
let toastTimer;

let runningApps = new Map(
  Object.entries(loadJSON(RUNNING_KEY, {})).map(([id, since]) => [id, Number(since)])
);

const saveRunning = () =>
  localStorage.setItem(RUNNING_KEY, JSON.stringify(Object.fromEntries(runningApps)));

const formatDuration = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (value) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
};

const startApp = (id) => {
  if (runningApps.has(id)) return;
  runningApps.set(id, Date.now());
  saveRunning();
};

const stopApp = (id, name) => {
  if (!runningApps.delete(id)) return;
  saveRunning();
  renderDock();
  showToast(`${name ?? "Uygulama"} kapatıldı.`);
};

const allApps = () => [...APPS, ...customApps];

const lightForeground = (hex) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "#fff";
  const values = [0, 2, 4].map((index) => Number.parseInt(normalized.slice(index, index + 2), 16));
  const luminance = (values[0] * 299 + values[1] * 587 + values[2] * 114) / 1000;
  return luminance > 190 ? "#18202c" : "#fff";
};

const iconStyles = (app) => [
  `--icon-start:${app.colors[0]}`,
  `--icon-end:${app.colors[1]}`,
  `color:${lightForeground(app.colors[0])}`
].join(";");

const showToast = (message) => {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2200);
};

const appsForView = () => {
  const query = elements.searchInput.value.trim().toLocaleLowerCase("tr-TR");
  return allApps()
    .filter((app) => activeCategory === "Favoriler" ? favorites.has(app.id) : app.category === activeCategory)
    .filter((app) => !query || `${app.name} ${app.category}`.toLocaleLowerCase("tr-TR").includes(query))
    .sort((left, right) => left.name.localeCompare(right.name, "tr"));
};

const launchApp = (app) => {
  if (editing) {
    toggleFavorite(app.id);
    return;
  }

  if (!app.url) {
    showToast(`${app.name} için bağlantı eklenmesi gerekiyor.`);
    return;
  }

  if (/^https?:/i.test(app.url)) {
    window.open(app.url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = app.url;
  }

  startApp(app.id);
  renderDock();
};

const toggleFavorite = (id) => {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  render();
  showToast(favorites.has(id) ? "Dock’a eklendi." : "Dock’tan çıkarıldı.");
};

const createAppCard = (app) => {
  const card = document.createElement("button");
  const hasArtwork = !app.custom;
  card.className = "app-card";
  card.type = "button";
  card.role = "listitem";
  card.title = app.url ? `${app.name} uygulamasını aç` : `${app.name} bağlantısını düzenle`;
  card.innerHTML = `
    <span class="favorite-toggle" aria-hidden="true">${favorites.has(app.id) ? "★" : "☆"}</span>
    <span class="app-icon${hasArtwork ? " has-artwork" : ""}" style="${iconStyles(app)}"></span>
    <span class="app-name"></span>
  `;
  const icon = card.querySelector(".app-icon");
  if (hasArtwork) {
    const image = document.createElement("img");
    image.src = `./icons/apps/${app.id}.svg`;
    image.alt = "";
    image.draggable = false;
    image.addEventListener("error", () => {
      icon.classList.remove("has-artwork");
      image.remove();
      icon.textContent = app.symbol;
    });
    icon.append(image);
  } else {
    icon.textContent = app.symbol;
  }
  card.querySelector(".app-name").textContent = app.name;
  card.addEventListener("click", () => launchApp(app));
  return card;
};

const renderApps = () => {
  const visibleApps = appsForView();
  elements.appGrid.replaceChildren(...visibleApps.map(createAppCard));
  elements.resultCount.textContent = `${visibleApps.length} uygulama`;
  elements.emptyState.hidden = visibleApps.length > 0;
};

const renderCategories = () => {
  const counts = allApps().reduce((map, app) => {
    map.set(app.category, (map.get(app.category) ?? 0) + 1);
    return map;
  }, new Map());

  const buttons = CATEGORIES.map((category) => {
    const button = document.createElement("button");
    const count = category.id === "Favoriler" ? favorites.size : (counts.get(category.id) ?? 0);
    button.type = "button";
    button.className = `category-button${activeCategory === category.id ? " active" : ""}`;
    button.style.setProperty("--category-color", category.color);
    button.innerHTML = `
      <span class="category-icon">${category.icon}</span>
      <span class="category-name"></span>
      <span class="category-count">${count}</span>
    `;
    button.querySelector(".category-name").textContent = category.id;
    button.addEventListener("click", () => {
      activeCategory = category.id;
      elements.searchInput.value = "";
      render();
    });
    return button;
  });

  elements.categoryList.replaceChildren(...buttons);
};

const createDockApp = (app) => {
  const running = runningApps.has(app.id);
  const since = running ? runningApps.get(app.id) : 0;
  const hasArtwork = !app.custom;
  const button = document.createElement("button");
  button.className = `dock-app${hasArtwork ? " has-artwork" : ""}${running ? " running" : ""}`;
  button.type = "button";
  button.title = app.name;
  button.style.cssText = iconStyles(app);

  const showDockGlyph = () => {
    button.classList.remove("has-artwork");
    const glyph = document.createElement("span");
    glyph.className = "dock-glyph";
    glyph.textContent = app.symbol;
    button.prepend(glyph);
  };

  if (hasArtwork) {
    const image = document.createElement("img");
    image.src = `./icons/apps/${app.id}.svg`;
    image.alt = "";
    image.draggable = false;
    image.addEventListener("error", () => {
      image.remove();
      showDockGlyph();
    });
    button.append(image);
  } else {
    showDockGlyph();
  }

  if (running) {
    const time = document.createElement("span");
    time.className = "dock-time";
    time.dataset.since = String(since);
    time.textContent = formatDuration(Date.now() - since);
    button.append(time);

    const quit = document.createElement("span");
    quit.className = "dock-quit";
    quit.textContent = "×";
    quit.title = `${app.name} uygulamasını kapat`;
    quit.addEventListener("click", (event) => {
      event.stopPropagation();
      stopApp(app.id, app.name);
    });
    button.append(quit);
  }

  button.addEventListener("click", () => launchApp(app));
  button.addEventListener("contextmenu", (event) => {
    if (!runningApps.has(app.id)) return;
    event.preventDefault();
    stopApp(app.id, app.name);
  });
  return button;
};

const renderDock = () => {
  const pinned = allApps().filter((app) => favorites.has(app.id)).slice(0, 12);
  const pinnedIds = new Set(pinned.map((app) => app.id));
  const runningExtra = allApps().filter(
    (app) => runningApps.has(app.id) && !pinnedIds.has(app.id)
  );

  const nodes = pinned.map(createDockApp);
  if (runningExtra.length > 0) {
    const separator = document.createElement("span");
    separator.className = "dock-separator";
    separator.setAttribute("aria-hidden", "true");
    nodes.push(separator, ...runningExtra.map(createDockApp));
  }
  elements.systemDock.replaceChildren(...nodes);
};

const render = () => {
  elements.contentTitle.textContent = activeCategory;
  elements.windowTitle.textContent = activeCategory;
  renderCategories();
  renderApps();
  renderDock();
};

const populateCategorySelect = () => {
  elements.categorySelect.replaceChildren(
    ...CATEGORIES
      .filter((category) => category.id !== "Favoriler")
      .map((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.id;
        return option;
      })
  );
};

const addCustomApp = (formData) => {
  const color = String(formData.get("color"));
  const app = {
    id: `custom-${crypto.randomUUID()}`,
    name: String(formData.get("name")).trim(),
    category: String(formData.get("category")),
    symbol: String(formData.get("symbol")).trim() || "◆",
    colors: [color, `${color}99`],
    url: String(formData.get("url")).trim(),
    favorite: formData.get("favorite") === "on",
    custom: true
  };

  customApps.push(app);
  localStorage.setItem(CUSTOM_APPS_KEY, JSON.stringify(customApps));
  if (app.favorite) {
    favorites.add(app.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }
  activeCategory = app.category;
  elements.appForm.reset();
  elements.appDialog.close();
  render();
  showToast(`${app.name} eklendi.`);
};

const updateClock = () => {
  const now = new Date();
  elements.menuClock.textContent = new Intl.DateTimeFormat("tr-TR", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);
};

elements.searchInput.addEventListener("input", renderApps);
elements.addButton.addEventListener("click", () => elements.appDialog.showModal());
elements.installButton.addEventListener("click", () => elements.installDialog.showModal());
elements.aboutButton.addEventListener("click", () => elements.installDialog.showModal());

elements.editButton.addEventListener("click", () => {
  editing = !editing;
  document.body.classList.toggle("editing", editing);
  elements.editButton.textContent = editing ? "Bitti" : "Düzenle";
  showToast(editing ? "Sarı yıldıza dokunarak Dock’u düzenleyin." : "Düzenleme tamamlandı.");
});

elements.appForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.appForm.reportValidity()) return;
  addCustomApp(new FormData(elements.appForm));
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase("tr-TR") === "k") {
    event.preventDefault();
    elements.searchInput.focus();
    elements.searchInput.select();
  }
  if (event.key === "Escape" && editing) {
    elements.editButton.click();
  }
});

populateCategorySelect();
render();
updateClock();
window.setInterval(updateClock, 30_000);

const tickRunning = () => {
  const now = Date.now();
  for (const element of elements.systemDock.querySelectorAll(".dock-time")) {
    element.textContent = formatDuration(now - Number(element.dataset.since));
  }
};
window.setInterval(tickRunning, 1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
