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

function log(message, payload) {
  const timestamp = new Date().toLocaleTimeString();
  const detail = payload ? `\n${JSON.stringify(payload, null, 2)}` : "";
  elements.logOutput.textContent = `[${timestamp}] ${message}${detail}\n\n${elements.logOutput.textContent}`;
}

function updateTokenState() {
  elements.apiBase.textContent = window.location.origin;
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

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(path, {
    ...options,
    headers
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    throw new Error((data && data.message) || `Request failed: ${response.status}`);
  }

  return data;
}

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
      '<div class="food-item"><p>No food records yet. Login and create one.</p></div>';
    return;
  }

  elements.foodsList.innerHTML = state.foods
    .map(
      (food) => `
        <article class="food-item">
          <header>
            <strong>${food.name}</strong>
            <span>$${food.price}</span>
          </header>
          <p>${food.description || "No description"}</p>
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

async function loadFoods() {
  try {
    state.foods = await request("/foods", { method: "GET" });
    renderFoods();
    log("Loaded foods", state.foods);
  } catch (error) {
    renderFoods();
    log(error.message);
  }
}

async function register() {
  try {
    const payload = {
      email: elements.authEmail.value,
      password: elements.authPassword.value
    };
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    saveToken(data.token);
    log("Registered user successfully", data);
  } catch (error) {
    log(error.message);
  }
}

async function login() {
  try {
    const payload = {
      email: elements.authEmail.value,
      password: elements.authPassword.value
    };
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    saveToken(data.token);
    log("Logged in successfully", data);
    await loadFoods();
  } catch (error) {
    log(error.message);
  }
}

async function saveFood(event) {
  event.preventDefault();

  const foodId = elements.foodId.value;
  const payload = {
    name: elements.foodName.value,
    description: elements.foodDescription.value,
    price: Number(elements.foodPrice.value || 0)
  };

  try {
    const data = await request(foodId ? `/foods/${foodId}` : "/foods", {
      method: foodId ? "PUT" : "POST",
      body: JSON.stringify(payload)
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
    const data = await request(`/foods/${id}`, {
      method: "DELETE"
    });

    log(`Deleted food #${id}`, data);
    await loadFoods();
  } catch (error) {
    log(error.message);
  }
}

async function checkHealth() {
  try {
    const data = await request("/health", { method: "GET" });
    elements.healthValue.textContent = data.status;
    log("Health check complete", data);
  } catch (error) {
    elements.healthValue.textContent = "error";
    log(error.message);
  }
}

async function runProcess() {
  try {
    const data = await request("/process", {
      method: "POST",
      body: JSON.stringify({})
    });
    elements.processValue.textContent = `${data.processingTimeMs} ms`;
    log("Process simulation complete", data);
    await loadMetrics();
  } catch (error) {
    log(error.message);
  }
}

async function loadMetrics() {
  try {
    const data = await request("/metrics", { method: "GET" });
    elements.requestsValue.textContent = data.totalRequests;
    elements.avgValue.textContent = `${data.averageResponseTimeMs} ms`;
    elements.uptimeValue.textContent = `${data.uptimeSeconds}s`;
    log("Loaded metrics", data);
  } catch (error) {
    log(error.message);
  }
}

function handleFoodListClick(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (!action || !id) {
    return;
  }

  const food = state.foods.find((item) => String(item.id) === id);
  if (!food) {
    return;
  }

  if (action === "edit") {
    populateFoodForm(food);
    log(`Loaded food #${id} into form`, food);
  }

  if (action === "delete") {
    deleteFood(id);
  }
}

function registerEventListeners() {
  document.getElementById("registerBtn").addEventListener("click", register);
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("logoutBtn").addEventListener("click", () => {
    saveToken("");
    log("Token cleared");
  });
  document.getElementById("foodForm").addEventListener("submit", saveFood);
  document.getElementById("resetFoodBtn").addEventListener("click", resetFoodForm);
  document.getElementById("refreshFoodsBtn").addEventListener("click", loadFoods);
  document.getElementById("healthBtn").addEventListener("click", checkHealth);
  document.getElementById("processBtn").addEventListener("click", runProcess);
  document.getElementById("metricsBtn").addEventListener("click", loadMetrics);
  elements.foodsList.addEventListener("click", handleFoodListClick);
}

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
