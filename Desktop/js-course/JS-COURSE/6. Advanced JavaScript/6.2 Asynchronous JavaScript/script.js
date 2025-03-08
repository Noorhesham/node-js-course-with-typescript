// Select elements
const orderButton = document.getElementById("orderButton");
const statusDIV = document.getElementById("status");
const characterDIV = document.getElementById("character");

// API URL
const apiBaseURL = "https://rickandmortyapi.com/api/character";

// Function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch a random character
async function fetchCharacter() {
  try {
    let response = await fetch(`${apiBaseURL}/${Math.floor(Math.random() * 20)}`);
    let character = await response.json();
    return character;
  } catch (error) {
    console.error("Failed to fetch character", error);
    return null;
  }
}

// Function to display the character
function displayCharacter(character) {
  if (!character) {
    statusDIV.textContent = "Failed to fetch delivery character.";
    return;
  }
  characterDIV.innerHTML = `
    <h2>Your Krabby Patty was delivered by ${character.name}!</h2>
    <img src="${character.image}" alt="${character.name}" width="200">
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Species:</strong> ${character.species}</p>
  `;
}

// Function to prepare and deliver the Krabby Patty
async function prepareKrabbyPatty() {
  statusDIV.textContent = "Order received! 🍔 SpongeBob is preparing your Krabby Patty...";
  await delay(1000);

  statusDIV.textContent = "Grilling the patty... 🔥";
  await delay(1000);

  statusDIV.textContent = "Adding sea pickles... 🥒";
  await delay(1000);

  statusDIV.textContent = "Krabby Patty is ready! 🏁 Fetching a delivery character...";
  await delay(1000);

  let character = await fetchCharacter();
  displayCharacter(character);
}

// Event Listener for order button
orderButton.addEventListener("click", prepareKrabbyPatty);
