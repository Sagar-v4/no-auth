// Function to generate an ID from the email (Base64 encoding)
export function generateEmailID(email, salt = ""): string {
  const combined = email + salt; // Combine email with salt (if any)
  const encoded = Buffer.from(combined).toString("base64"); // Encode as Base64
  return encoded;
}

// Function to decode the ID back to the email
export function decodeEmailID(encodedID, salt = ""): string {
  const decoded = Buffer.from(encodedID, "base64").toString("utf-8"); // Decode from Base64
  // Remove the salt from the decoded string (if salt was used)
  return decoded.replace(salt, ""); // Return the original email
}
