const setUsers = () => {
  localStorage.clear(); // Clear existing data
  const defaultUsers = [
    { username: "coral", password: "123" },
    { username: "avi", password: "123" }
  ];
  
  const usersString = JSON.stringify(defaultUsers);
  localStorage.setItem("users", usersString);
}

const addFileToUser = (userId, file) => {
  const usersString = localStorage.getItem("users");
  if (usersString) {
    const users = JSON.parse(usersString);
    const user = users.find(user => user.id === userId);
    if (user) {
      user.files.push(file);
      setUsers(users);
    }
  }
}
const removeFileFromUser = (userId, fileId) => {
    const usersString = localStorage.getItem("users");
    if (usersString) {
        const users = JSON.parse(usersString);
        const user = users.find(user => user.id === userId);
        if (user) {
        user.files = user.files.filter(file => file.id !== fileId);
        setUsers(users);
        }
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
  const usersString = localStorage.getItem("users");
  if (usersString) {
    const users = JSON.parse(usersString);
    return users.some(user => user.username === username && user.password === password);
  }
  return false;
}

const getFileByName = (userId, fileName) => {
  const usersString = localStorage.getItem("users");
  if (usersString) {
    const users = JSON.parse(usersString);
    const user = users.find(user => user.id === userId);
    if (user) {
      return user.files.find(file => file.name === fileName);
    }
  }
  return null;
}   

export { setUsers, addFileToUser, removeFileFromUser, getUsers, getFileByName,checkLogin };