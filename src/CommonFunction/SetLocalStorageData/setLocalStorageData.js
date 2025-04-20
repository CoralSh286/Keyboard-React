/**
* Saves users array to localStorage
*/
const setUsers = (users) => {
  const usersString = JSON.stringify(users);
  localStorage.setItem("users", usersString);
}

/**
 * Adds a new file to a user's files array in localStorage
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


/**
* Removes a file from a user's files array
*/
const removeFileFromUser = (userName, fileName) => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.username === userName);
  
  if (userIndex !== -1) {
      // Modify the user directly in the users array
      users[userIndex].files = users[userIndex].files.filter(file => file.name !== fileName);
      setUsers(users);
      return true;
  }
  
  return false;
}

/**
* Retrieves all users from localStorage
*/
const getUsers = () => {
  const usersString = localStorage.getItem("users");
  if (usersString) {
    return JSON.parse(usersString);
  }
  return [];
}

/**
* Validates user login credentials
*/
const checkLogin  = (username, password) => {
    const users = getUsers();
    return users.some(user => user.username === username && user.password === password);
}

/**
* Gets the content of a specific file for a user
*/
const getFileContent = (username , fileName )=>{
  const user = getUserByName(username)
  const {content} = user.files.find(file=> file.name == fileName)
  return content
}

/**
* Adds a new user to localStorage
*/
const addNewUser = (newUser) => {
  const users = getUsers();
  users.push(newUser);
  setUsers(users);
}

/**
* Checks if a username already exists
*/
const checkIfUserExists = (username) => {
  const users = getUsers();
  return users.some(user => user.username === username);
}

/**
* Updates the content of a specific file for a user
*/
const changeFileByName = (userName, fileName, fileContent) => {
  if (!userName || !fileName || fileContent === undefined) {
    console.error("Missing required parameters for ");
    return false;
  }
  
  try {
    // Get all users
    const users = getUsers();
    // Find the user
    const userIndex = users.findIndex(user => user.username === userName);
    
    if (userIndex === -1) {
      console.error(`User '${userName}' not found`);
      return false;
    }
    
    const user = users[userIndex];
    
    // Check if user has any files
    if (!user.files || !Array.isArray(user.files)) {
      console.error(`User '${userName}' has no files array`);
      return false;
    }
    
    // Find the file by name
    const fileIndex = user.files.findIndex(file => file.name === fileName);
    
    if (fileIndex === -1) {
      console.error(`File '${fileName}' not found for user '${userName}'`);
      return false;
    }
    
    // Update the file content
    users[userIndex].files[fileIndex].content = fileContent;
    
    // Save the updated users array back to localStorage
    setUsers(users);
    
    return true;
  } catch (error) {
    console.error("Error in :", error);
    return false;
  }
};

/**
* Retrieves a user object by username
*/
const getUserByName = (username) => {
  const users = getUsers();
  return users.find(user => user.username === username);
}


export { setUsers, addNewFileToUser,changeFileByName, removeFileFromUser, getUsers,checkLogin,addNewUser ,checkIfUserExists,getUserByName,getFileContent};