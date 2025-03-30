const setUsers = (users) => {
  const usersString = JSON.stringify(users);
  const defaultUsers = [
    { username: "coral", password: "123" },
    { username: "avi", password: "123" }
  ];
  
  localStorage.setItem("users", defaultUsers);
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