const crypto = require('crypto');

const targetHash = "5531a5834816222280f20d1ef9e95f69";

function bruteForce() {
    for (let pin = 0; pin <= 10000; pin++) {
        const targetPin = pin.toString().padStart(4, '0');

        const hash = crypto.createHash("md5").update(targetPin).digest('hex');

        if (hash === targetHash) {
            return targetPin;
        }
    }
    return null;
}

const isFound = bruteForce();

if (isFound != "" || !isFound) {
    console.log(`Alice's PIN: ${isFound}`);
}
else {
    console.log(`Alice's PIN not found`);
}