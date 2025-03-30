const setUsers = (users) => {
  const usersString = JSON.stringify(users);
  localStorage.setItem("users", usersString);
}

const addNewFileToUser = (userId, file) => {
    const users = getUsers()
    const user = users.find(user => user.id === userId);
    if (user) {
      user.files.push(file);
      setUsers(users);
    }
} 
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