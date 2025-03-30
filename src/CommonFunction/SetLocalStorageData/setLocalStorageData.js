const setUsers = (users) => {
  const usersString = JSON.stringify(users);
  localStorage.setItem("users", usersString);
}
// Function to add a new file to a user's files array
/**
 * Adds a new file to a user's files array in localStorage
 * @param {string} username - The username of the user
 * @param {object} fileData - The file data to save
 * @returns {boolean} - Whether the operation was successful
 */
const addNewFileToUser = (username, fileData) => {
  if (!username || !fileData) return false;
  
  const users = getUsers();
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) return false; // User not found
  
  // Initialize files array if it doesn't exist
  if (!users[userIndex].files) {
    users[userIndex].files = [];
  }
  
  try {
    // Create a new file object with just name and content
    // The content should already be processed by processContent function
    const newFile = {
      name: fileData.name,
      content: fileData.content,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    // Test if it can be serialized
    JSON.stringify(newFile);
    
    // Add new file to user's files array
    users[userIndex].files.push(newFile);
    
    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    return true;
  } catch (error) {
    console.error("Error saving file:", error);
    return false;
  }
};
const removeFileFromUser = (userId, fileId) => {
  
        const users = getUsers()
        const user = users.find(user => user.id === userId);
        if (user) {
        user.files = user.files.filter(file => file.id !== fileId);
        setUsers(users);
        }
    
    }
const getUsers = () => {
  const usersString = localStorage.getItem("users");
  if (usersString) {
    return JSON.parse(usersString);
  }
  return [];
}
const checkLogin  = (username, password) => {

    const users = getUsers();
    return users.some(user => user.username === username && user.password === password);
  

}

const addNewUser = (newUser) => {
  const users = getUsers();
  users.push(newUser);
  setUsers(users);
}
const checkIfUserExists = (username) => {
  const users = getUsers();
  return users.some(user => user.username === username);
}
const getFileByName = (userId, fileName) => {

    const users = getUsers
    const user = users.find(user => user.id === userId);
    if (user) {
      return user.files.find(file => file.name === fileName);
    }
  
  return null;
}   
const getUserByName = (username) => {
  const users = getUsers();
  return users.find(user => user.username === username);
}
export { setUsers, addNewFileToUser, removeFileFromUser, getUsers, getFileByName,checkLogin,addNewUser ,checkIfUserExists,getUserByName};