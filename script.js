
const itemsContainer = document.getElementById("itemsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const reportForm = document.getElementById("reportForm");
const formMessage = document.getElementById("formMessage");

let activeFilter = "All";

// Sample reports to display when the website first opens
let items = [
  {
    id: 1,
    name: "Blue Water Bottle",
    type: "Lost",
    category: "Other",
    location: "College Library",
    date: "2026-10-12",
    description: "A blue reusable water bottle."
  },
  {
    id: 2,
    name: "Student ID Card",
    type: "Found",
    category: "ID & Cards",
    location: "Block A",
    date: "2026-10-13",
    description: "A student ID card found near the classroom."
  },
  {
    id: 3,
    name: "Black Backpack",
    type: "Lost",
    category: "Bags & Books",
    location: "College Cafeteria",
    date: "2026-10-14",
    description: "A black backpack with notebooks inside."
  }
];

// Display reports on the page
function displayItems() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredItems = items.filter((item) => {
    const searchableText = [
      item.name,
      item.category,
      item.location,
      item.description,
      item.type
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesFilter =
      activeFilter === "All" || item.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  itemsContainer.replaceChildren();

  if (filteredItems.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No matching reports found.";
    itemsContainer.appendChild(message);
    updateCounters();
    return;
  }

  filteredItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";

    const badge = document.createElement("span");
    badge.className = `item-badge ${item.type.toLowerCase()}`;
    badge.textContent = item.type;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${item.category}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${item.location}`;

    const date = document.createElement("p");
    date.textContent = `Date: ${item.date}`;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.append(badge, title, category, location, date, description);
    itemsContainer.appendChild(card);
  });

  updateCounters();
}

// Update report totals
function updateCounters() {
  document.getElementById("totalItems").textContent = items.length;

  document.getElementById("lostItems").textContent =
    items.filter((item) => item.type === "Lost").length;

  document.getElementById("foundItems").textContent =
    items.filter((item) => item.type === "Found").length;
}

// Search as the user types
searchInput.addEventListener("input", displayItems);

// Filter Lost, Found, or All reports
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    displayItems();
  });
});

// Add a new report from the form
reportForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const type = document.getElementById("itemType").value;
  const category = document.getElementById("itemCategory").value;
  const location = document.getElementById("itemLocation").value.trim();
  const date = document.getElementById("itemDate").value;
  const description =
    document.getElementById("itemDescription").value.trim();

  if (!name || !location || !date || !description) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  const newItem = {
    id: Date.now(),
    name,
    type,
    category,
    location,
    date,
    description
  };

  items.unshift(newItem);

  reportForm.reset();
  formMessage.textContent = "Report added successfully!";

  // Show the newly added report
  activeFilter = "All";
  searchInput.value = "";

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === "All");
  });

  displayItems();
  document.getElementById("items").scrollIntoView({
    behavior: "smooth"
  });
});

// Show the initial reports and totals
displayItems();
