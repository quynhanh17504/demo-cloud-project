const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : window.location.origin;
    
const state = {
  token: localStorage.getItem("demo-token") || "",
  foods: []
};

const elements = {
  apiBase: document.getElementById("apiBase"),
  tokenState: document.getElementById("tokenState"),
  logOutput: document.getElementById("logOutput"),
  healthValue: document.getElementById("healthValue"),
  processValue: document.getElementById("processValue"),
  requestsValue: document.getElementById("requestsValue"),
  avgValue: document.getElementById("avgValue"),
  uptimeValue: document.getElementById("uptimeValue"),
  foodsList: document.getElementById("foodsList"),
  authEmail: document.getElementById("email"),
  authPassword: document.getElementById("password"),
  foodId: document.getElementById("foodId"),
  foodName: document.getElementById("foodName"),
  foodDescription: document.getElementById("foodDescription"),
  foodPrice: document.getElementById("foodPrice")
};

// ===== Utils =====
function log(message, payload) {
  const timestamp = new Date().toLocaleTimeString();
  const detail = payload ? `\n${JSON.stringify(payload, null, 2)}` : "";
  elements.logOutput.textContent =
    `[${timestamp}] ${message}${detail}\n\n${elements.logOutput.textContent}`;
}

function escapeHTML(str = "") {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// ===== Token =====
function updateTokenState() {
  elements.apiBase.textContent = API_BASE;
  elements.tokenState.textContent = state.token ? "JWT loaded" : "Not logged in";
}

function saveToken(token) {
  state.token = token || "";

  if (state.token) {
    localStorage.setItem("demo-token", state.token);
  } else {
    localStorage.removeItem("demo-token");
  }

  updateTokenState();
}

// ===== API =====
async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers
    });
  } catch (err) {
    console.error("Fetch error:", err);
    throw new Error("Network error - server unreachable");
  }

  // Safe parse
  let data = null;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    console.warn("Invalid JSON response");
  }

  if (!response.ok) {
    const message =
      (data && data.message) ||
      `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return data;
}

// ===== Food UI =====
function resetFoodForm() {
  elements.foodId.value = "";
  elements.foodName.value = "";
  elements.foodDescription.value = "";
  elements.foodPrice.value = "12.50";
}

function populateFoodForm(food) {
  elements.foodId.value = food.id;
  elements.foodName.value = food.name;
  elements.foodDescription.value = food.description || "";
  elements.foodPrice.value = food.price;
}

function renderFoods() {
  if (state.foods.length === 0) {
    elements.foodsList.innerHTML =
      '<div class="food-item"><p>No food records yet.</p></div>';
    return;
  }

  elements.foodsList.innerHTML = state.foods
    .map(
      (food) => `
        <article class="food-item">
          <header>
            <strong>${escapeHTML(food.name)}</strong>
            <span>$${food.price}</span>
          </header>
          <p>${escapeHTML(food.description || "No description")}</p>
          <div class="actions">
            <button type="button" data-action="edit" data-id="${food.id}">Edit</button>
            <button type="button" class="ghost" data-action="delete" data-id="${food.id}">
              Delete
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

// ===== API Actions =====
async function loadFoods() {
  try {
    state.foods = await request("/foods");
    renderFoods();
    log("Loaded foods", state.foods);
  } catch (error) {
    renderFoods();
    log(error.message);
  }
}

async function register() {
  try {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: elements.authEmail.value,
        password: elements.authPassword.value
      })
    });

    saveToken(data.token);
    log("Registered successfully", data);
  } catch (error) {
    log(error.message);
  }
}

async function login() {
  try {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: elements.authEmail.value,
        password: elements.authPassword.value
      })
    });

    saveToken(data.token);
    log("Login success", data);
    await loadFoods();
  } catch (error) {
    log(error.message);
  }
}

async function saveFood(event) {
  event.preventDefault();

  const price = Number(elements.foodPrice.value);
  if (isNaN(price) || price < 0) {
    log("Invalid price");
    return;
  }

  const foodId = elements.foodId.value;

  try {
    const data = await request(foodId ? `/foods/${foodId}` : "/foods", {
      method: foodId ? "PUT" : "POST",
      body: JSON.stringify({
        name: elements.foodName.value,
        description: elements.foodDescription.value,
        price
      })
    });

    log(foodId ? "Updated food" : "Created food", data);
    resetFoodForm();
    await loadFoods();
  } catch (error) {
    log(error.message);
  }
}

async function deleteFood(id) {
  try {
    await request(`/foods/${id}`, { method: "DELETE" });
    log(`Deleted food #${id}`);
    await loadFoods();
  } catch (error) {
    log(error.message);
  }
}

// ===== Metrics =====
async function checkHealth() {
  try {
    const data = await request("/health");
    elements.healthValue.textContent = data.status;
  } catch {
    elements.healthValue.textContent = "error";
  }
}

async function runProcess() {
  try {
    const data = await request("/process", {
      method: "POST",
      body: JSON.stringify({})
    });

    elements.processValue.textContent = `${data.processingTimeMs} ms`;
    await loadMetrics();
  } catch (error) {
    log(error.message);
  }
}

async function loadMetrics() {
  try {
    const data = await request("/metrics");
    elements.requestsValue.textContent = data.totalRequests;
    elements.avgValue.textContent = `${data.averageResponseTimeMs} ms`;
    elements.uptimeValue.textContent = `${data.uptimeSeconds}s`;
  } catch (error) {
    log(error.message);
  }
}

// ===== Events =====
function handleFoodListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const { action, id } = target.dataset;
  if (!action || !id) return;

  const food = state.foods.find((f) => String(f.id) === id);
  if (!food) return;

  if (action === "edit") populateFoodForm(food);
  if (action === "delete") deleteFood(id);
}

function registerEventListeners() {
  document.getElementById("registerBtn").onclick = register;
  document.getElementById("loginBtn").onclick = login;

  document.getElementById("logoutBtn").onclick = () => {
    saveToken("");
    state.foods = [];
    renderFoods();
    log("Logged out");
  };

  document.getElementById("foodForm").onsubmit = saveFood;
  document.getElementById("resetFoodBtn").onclick = resetFoodForm;
  document.getElementById("refreshFoodsBtn").onclick = loadFoods;
  document.getElementById("healthBtn").onclick = checkHealth;
  document.getElementById("processBtn").onclick = runProcess;
  document.getElementById("metricsBtn").onclick = loadMetrics;

  elements.foodsList.onclick = handleFoodListClick;
}

// ===== Init =====
async function bootstrap() {
  updateTokenState();
  renderFoods();
  registerEventListeners();

  await checkHealth();
  await loadMetrics();

  if (state.token) {
    await loadFoods();
  }
}

bootstrap();