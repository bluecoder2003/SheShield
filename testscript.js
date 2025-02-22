import bcrypt from "bcryptjs";

const testPassword = "123456Ui@"; // Replace with your actual password
const hashedPassword = await bcrypt.hash(testPassword, 10);

console.log("Hashed Password:", hashedPassword);

const isMatch = await bcrypt.compare(testPassword, hashedPassword);
console.log("Password Match Result:", isMatch); // Should be true
