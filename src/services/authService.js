// Frontend-only auth service - No API calls, just localStorage

const STORAGE_KEYS = {
  USERS: 'echoverse_users',
  CURRENT_USER: 'echoverse_current_user',
  TOKEN: 'echoverse_token'
};

// Initialize default users if none exist
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 1,
        name: 'Ahmed Raza',
        email: 'ahmed@university.edu',
        password: 'password123',
        role: 'student',
        department: 'Computer Science',
        university: 'Tech University',
        points: 1250,
        bio: 'Passionate about AI and Machine Learning',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Fatima Khan',
        email: 'fatima@university.edu',
        password: 'password123',
        role: 'student',
        department: 'Data Science',
        university: 'Tech University',
        points: 890,
        bio: 'Data enthusiast',
        createdAt: '2024-02-10'
      },
      {
        id: 3,
        name: 'Dr. Sarah Khan',
        email: 'sarah@university.edu',
        password: 'password123',
        role: 'faculty',
        department: 'Computer Science',
        university: 'Tech University',
        specialization: 'Artificial Intelligence',
        bio: 'PhD in AI from Stanford',
        createdAt: '2023-08-20'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
};

// Call initialization
initializeUsers();

const authService = {
  // Register new user
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
          
          // Check if user already exists
          const existingUser = users.find(u => u.email === userData.email);
          if (existingUser) {
            reject({ message: 'User already exists with this email' });
            return;
          }
          
          // Create new user
          const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            department: userData.department,
            university: userData.university,
            points: 0,
            bio: '',
            createdAt: new Date().toISOString()
          };
          
          users.push(newUser);
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
          
          // Return user without password
          const { password, ...userWithoutPassword } = newUser;
          resolve({
            success: true,
            message: 'Registration successful! Please login.',
            user: userWithoutPassword
          });
        } catch (error) {
          reject({ message: 'Registration failed. Please try again.' });
        }
      }, 500);
    });
  },

  // Login user
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          
          if (!user) {
            reject({ message: 'Invalid email or password' });
            return;
          }
          
          // Generate mock token
          const token = 'mock-token-' + Date.now() + '-' + user.id;
          
          // Save current user
          const { password: _, ...userWithoutPassword } = user;
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);
          
          resolve({
            success: true,
            token: token,
            user: userWithoutPassword
          });
        } catch (error) {
          reject({ message: 'Login failed. Please try again.' });
        }
      }, 500);
    });
  },

  // Get current logged in user
  getCurrentUser: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        
        if (userJson && token) {
          resolve({ user: JSON.parse(userJson) });
        } else {
          resolve({ user: null });
        }
      }, 100);
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const currentUserJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
          if (!currentUserJson) {
            reject({ message: 'No user logged in' });
            return;
          }
          
          const currentUser = JSON.parse(currentUserJson);
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
          
          // Update user in users array
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...profileData };
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
          }
          
          // Update current user
          const updatedUser = { ...currentUser, ...profileData };
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
          
          resolve({ success: true, user: updatedUser });
        } catch (error) {
          reject({ message: 'Failed to update profile' });
        }
      }, 500);
    });
  },

  // Get user by ID
  getUserById: (userId) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.id === userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  // Get all users
  getAllUsers: () => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    return users.map(({ password, ...user }) => user);
  }
};

export default authService;