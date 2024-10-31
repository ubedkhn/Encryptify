const container = document.querySelector(".container");
const networkPatterns = [];

// Function to create a network pattern at random positions
function createNetworkPattern() {
  const pattern = document.createElement("div");
  pattern.className = "network-pattern";
  pattern.style.left = `${Math.random() * window.innerWidth}px`;
  pattern.style.top = `${Math.random() * window.innerHeight}px`;
  container.appendChild(pattern);
  networkPatterns.push(pattern);
}

// Create initial network patterns
for (let i = 0; i < 100; i++) {
  createNetworkPattern();
}

// Function to generate a random password
function generatePassword(length, includeNumbers, includeSpecialChars) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let validChars = lowerChars + upperChars;
  if (includeNumbers) validChars += numbers;
  if (includeSpecialChars) validChars += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }
  return password;
}

// Function to animate patterns based on mouse movement
document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  networkPatterns.forEach((pattern) => {
    const dx = pattern.offsetLeft - x;
    const dy = pattern.offsetTop - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Move the patterns away from the cursor
    const moveDistance = Math.min(30, 100 / distance); // Change the divisor for sensitivity
    pattern.style.transform = `translate(${dx / moveDistance}px, ${
      dy / moveDistance
    }px)`;
  });
});

// Generate password button event
document.getElementById("generateButton").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSpecialChars = document.getElementById(
    "includeSpecialChars"
  ).checked;
  const generatedPassword = generatePassword(
    length,
    includeNumbers,
    includeSpecialChars
  );

  document.getElementById("generatedPassword").value = generatedPassword;
});
