// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  console.log('Zoo Management System Loaded');

// Declaring variables for different animal species
const elephants = 4; // Number of elephants in the zoo.
const tigers = 2; // Number of tigers in the zoo.
const pandas = 3; // Number of pandas in the zoo.

console.log("Number of Elephants:", elephants);
console.log("Number of Tigers:", tigers);
console.log("Number of Pandas:", pandas);

// Calculate total number of animals in the zoo
const totalAnimals = elephants + tigers + pandas; // Calculate total number of animals
console.log("Total number of animals in the zoo:", totalAnimals);

console.log("String Conversion:", String(totalAnimals));
console.log("Boolean Conversion:", Boolean(totalAnimals));

let zooOpen = true; // Initial zoo status (open)
zooOpen = !zooOpen;// Toggle zoo status
console.log("Is the zoo open?", zooOpen ? "Yes" : "No");

// Step 1: Create an array to store animal objects
const animals = [];
let visitorCount = 0;
 let zooStatus = 'Open'

// Step 2: Create animal objects and push them into the array
// Each object represents an animal with properties like id, name, species, count, gender, and status
animals.push({ id: 1, name: 'Ellie', species: 'Elephant', count: 3, gender: 'Female', status: 'Open', health: 'Healthy' });
animals.push({ id: 2, name: 'Tony', species: 'Tiger', count: 2, gender: 'Male', status: 'Closed', health: 'Sick' });
animals.push({ id: 3, name: 'Panda', species: 'Panda', count: 4, gender: 'Male', status: 'Open', health: 'Healthy' });

// Output the entire array to verify structure
console.table(animals);

// Step 3: Add a new animal using push
// push() adds an element to the end of an array
animals.push({ id: 4, name: 'Leo', species: 'Lion', count: 5, gender: 'Male', status: 'Open', health: 'Healthy' });
console.table(animals);

// Step 4: Remove an animal using slice (returns a new array without the second animal)
// slice() returns a shallow copy of a portion of an array without modifying the original array
const updatedAnimals = animals.slice(0, 1).concat(animals.slice(2));
console.table(updatedAnimals);

// Step 5: Filter animals by status
// filter() creates a new array with all elements that pass a test
const openAnimals = updatedAnimals.filter(animal => animal.status === 'Open');
console.table(openAnimals);

// Step 6: Modify properties
// Access object properties using dot notation and assign a new value
updatedAnimals[0].count = 5; // Update count
updatedAnimals[1].status = 'Open'; // Update status
console.table(updatedAnimals);

// Sprint A3 Part 2: Function to Display Animals
// Dynamically creates and adds animal cards to the DOM
const displayAnimals = () => {
  try {
      const container = document.getElementById('animalContainer');
      if (!container) throw new Error('Animal container element not found');
      container.innerHTML = '';
      animals.forEach(animal => {
          const card = document.createElement('div');
          card.className = 'animal-card';
          card.innerHTML = `
              <h3>${animal.name} (${animal.species})</h3>
              <p>Status: <span id="status-${animal.id}">${animal.status}</span></p>
              <p>Health: <span id="health-${animal.id}">${animal.health}</span></p>
              <button onclick="toggleStatus(${animal.id})">Toggle Status</button>
              <button onclick="updateHealth(${animal.id})">Update Health</button>
          `;
          container.appendChild(card);
      });
      updateZooStatusDisplay(); // Ensure zoo status is shown
      updateVisitorDisplay(); // Ensure visitor count is shown
  } catch (error) {
      console.error('Error displaying animals:', error);
      alert('An error occurred while loading the zoo data.');
  }
};

// Function to update the zoo status display on the page
const updateZooStatusDisplay = () => {
  const zooStatusElement = document.getElementById('zooStatus');
    if (zooStatusElement) {
      zooStatusElement.textContent = `Zoo Status: ${zooStatus}`;
    }
  };

// Spring A3 Part 3: Interactive Features
// Function to toggle an animal's status (Open/Closed)
window.toggleStatus = (id) => {
  const animal = animals.find(a => a.id === id);
  if (!animal) {
    console.error(`Error: Animal with ID ${id} not found`);
    return;
  }
  animal.status = animal.status === 'Open' ? 'Closed' : 'Open';
  const statusElement = document.getElementById(`status-${id}`);
  if (statusElement) {
    statusElement.textContent = animal.status;
  } 
  else {
    console.error(`Error: Status element for animal ID ${id} not found`);
  }
};

// Function to toggle an animal's health status (Healthy/Sick)
window.updateHealth = (id) => {
  try {
      const animal = animals.find(a => a.id === id);
      if (!animal) throw new Error(`Animal with ID ${id} not found`);
      animal.health = animal.health === 'Healthy' ? 'Sick' : 'Healthy';
      document.getElementById(`health-${id}`).textContent = animal.health;
      displayAnimals();
  } catch (error) {
      console.error('Error updating health:', error);
      alert('Failed to update animal health.');
  }
};

// Function to update visitor count and ensure it does not go negative
window.updateVisitors = (change) => {
  visitorCount += change;
  if (visitorCount < 0) visitorCount = 0;
    updateVisitorDisplay();
  };

// Function to update visitor count and ensure it does not go negative
const updateVisitorDisplay = () => {
  const visitorElement = document.getElementById('visitorCount');
  if (visitorElement) {
     visitorElement.textContent = `Visitors: ${visitorCount}`;
  } else {
      console.error('Error: visitorCount element not found');
    }
};

// Function to toggle the zoo status (open/closed)
    // Function to toggle the overall zoo status (Open/Closed)
    window.toggleZooStatus = () => {
      try {
          zooStatus = zooStatus === 'Open' ? 'Closed' : 'Open';
          animals.forEach(animal => animal.status = zooStatus);
          displayAnimals();
      } catch (error) {
          console.error('Error toggling zoo status:', error);
          alert('Failed to update zoo status.');
      }
  };

// Function to display zoo statistics
window.displayZooStatistics = () => {
  const totalAnimals = animals.length;
  const openAnimals = animals.filter(animal => animal.status === 'Open').length;
  const closedAnimals = animals.filter(animal => animal.status === 'Closed').length;

  console.log(`Total Animals: ${totalAnimals}`);
  console.log(`Open Animals: ${openAnimals}`);
  console.log(`Closed Animals: ${closedAnimals}`);
  console.log(`Current Visitor Count: ${visitorCount}`);
};

// Part 2: Interactive Features

// Zoo Statistics
// Function to calculate and display total number of animals, and number of open vs closed species
function displayZooStatistics() {
  const totalAnimals = updatedAnimals.reduce((sum, animal) => sum + animal.count, 0);
  const openSpecies = updatedAnimals.filter(animal => animal.status === 'open').length;
  const closedSpecies = updatedAnimals.filter(animal => animal.status === 'closed').length;

  console.log(`Total Number of Animals: ${totalAnimals}`);
  console.log(`Number of Open Species: ${openSpecies}`);
  console.log(`Number of Closed Species: ${closedSpecies}`);
}
displayZooStatistics();

// Search and Filter Functionality
// Function to search for an animal by name using find() method
// find() returns the first element that satisfies a condition
function searchAnimalByName(name) {
  const result = updatedAnimals.find(animal => animal.name.toLowerCase() === name.toLowerCase());
  console.log(result ? result : 'Animal not found');
}

// Function to filter animals by status using filter() method
function filterAnimalsByStatus(status) {
  const result = updatedAnimals.filter(animal => animal.status === status);
  console.table(result);
}

searchAnimalByName('Ellie'); // Example search
filterAnimalsByStatus('open'); // Example filter

// Part 3: Display and User Interaction
// Final console log to confirm the system is loaded
console.log('Zoo Data Management System Loaded');
// Initialize and render animal cards on page load
displayAnimals();
});