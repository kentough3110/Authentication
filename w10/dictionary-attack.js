const crypto = require("crypto");
const https = require("https");

const target = "578ed5a4eecf5a15803abdc49f6152d6";
const url = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt";

// Function to generate MD5 hash
function genMD5(words) {
  return crypto.createHash('md5').update(words).digest('hex');
}

function dictionaryAttack() {
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Failed to fetch password list. Status Code: ${res.statusCode}`);
      res.resume(); // Consume response data to free up memory
      return;
    }

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const passwords = data.split("\n");

      for (let password of passwords) {
        const trimmedPassword = password.trim();
        const hash = genMD5(trimmedPassword);

        if (hash === target) {
          console.log(`Bob's Password: ${trimmedPassword}`);
          return;
        }
      }
      console.log("Password not found in the list.");
    });
  }).on("error", (err) => {
    console.error(`Error fetching password list: ${err.message}`);
  });
}

dictionaryAttack();
