import axios from 'axios';

// Use mock mode for frontend-only development
const USE_MOCK = true;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Mock data storage
let mockUsers = [
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
    skills: ['React', 'Python', 'Machine Learning'],
    interests: ['AI', 'Web Development'],
    enrolledCourses: ['CS101', 'CS202'],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
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

let mockPosts = [
  {
    id: 1,
    content: 'Just published my research paper on Machine Learning! Check it out.',
    type: 'research',
    author: { id: 1, name: 'Ahmed Raza', department: 'Computer Science', avatar: 'AR' },
    likesCount: 15,
    commentsCount: 3,
    isLiked: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 1, author: 'Fatima Khan', text: 'Great work! Can you share the link?', createdAt: new Date().toISOString() },
      { id: 2, author: 'Dr. Sarah Khan', text: 'Impressive research!', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 2,
    content: 'Looking for team members for a Web Development project. Interested students please comment!',
    type: 'project',
    author: { id: 1, name: 'Ahmed Raza', department: 'Computer Science', avatar: 'AR' },
    likesCount: 8,
    commentsCount: 2,
    isLiked: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      { id: 1, author: 'Ali Hassan', text: 'I am interested!', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 3,
    content: 'Faculty Announcement: Midterm exams will start from April 15th. Please prepare accordingly.',
    type: 'announcement',
    author: { id: 2, name: 'Dr. Sarah Khan', department: 'Computer Science', avatar: 'SK' },
    likesCount: 25,
    commentsCount: 5,
    isLiked: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    comments: []
  }
];

let currentUser = null;
let currentToken = null;

// Mock response handler
const mockRequest = (method, url, data) => {
  console.log(`[MOCK] ${method} ${url}`, data);
  
  // Auth Routes
  if (method === 'POST' && url === '/auth/register') {
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = {
      id: mockUsers.length + 1,
      ...data,
      points: 0,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return {
      success: true,
      message: 'Registration successful',
      user: { ...newUser, password: undefined }
    };
  }
  
  if (method === 'POST' && url === '/auth/login') {
    const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    currentUser = user;
    currentToken = `mock-jwt-token-${user.id}-${Date.now()}`;
    return {
      success: true,
      token: currentToken,
      user: { ...user, password: undefined }
    };
  }
  
  if (method === 'GET' && url === '/auth/me') {
    if (!currentUser) {
      return { success: false, message: 'Not authenticated' };
    }
    return {
      success: true,
      user: { ...currentUser, password: undefined }
    };
  }
  
  // Posts Routes
  if (method === 'GET' && url === '/posts') {
    return {
      success: true,
      posts: mockPosts
    };
  }
  
  if (method === 'POST' && url === '/posts') {
    const newPost = {
      id: mockPosts.length + 1,
      ...data,
      author: { 
        id: currentUser?.id, 
        name: currentUser?.name, 
        department: currentUser?.department,
        avatar: currentUser?.name?.charAt(0)
      },
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
      comments: []
    };
    mockPosts.unshift(newPost);
    return {
      success: true,
      post: newPost
    };
  }
  
  if (method === 'POST' && url.match(/\/posts\/\d+\/like/)) {
    const postId = parseInt(url.split('/')[2]);
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likesCount += post.isLiked ? 1 : -1;
      return { success: true, post };
    }
  }
  
  if (method === 'POST' && url.match(/\/posts\/\d+\/comments/)) {
    const postId = parseInt(url.split('/')[2]);
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      const newComment = {
        id: post.comments.length + 1,
        author: currentUser?.name || 'Anonymous',
        text: data.comment || data.content,
        createdAt: new Date().toISOString()
      };
      post.comments.push(newComment);
      post.commentsCount++;
      return { success: true, post };
    }
  }
  
  // User Routes
  if (method === 'PUT' && url === '/users/profile') {
    if (currentUser) {
      currentUser = { ...currentUser, ...data };
      const index = mockUsers.findIndex(u => u.id === currentUser.id);
      if (index !== -1) mockUsers[index] = currentUser;
      return { success: true, user: { ...currentUser, password: undefined } };
    }
  }
  
  if (method === 'GET' && url === '/users/stats') {
    return {
      success: true,
      stats: {
        totalPosts: mockPosts.filter(p => p.author.id === currentUser?.id).length,
        totalLikes: mockPosts.reduce((sum, p) => sum + (p.author.id === currentUser?.id ? p.likesCount : 0), 0),
        totalComments: mockPosts.reduce((sum, p) => sum + (p.author.id === currentUser?.id ? p.commentsCount : 0), 0),
        rank: 15
      }
    };
  }
  
  // Default response
  return { success: false, message: 'Mock endpoint not found' };
};

// API interceptor for mock mode
if (USE_MOCK) {
  api.interceptors.request.use(async (config) => {
    const method = config.method?.toUpperCase();
    const url = config.url || '';
    const data = config.data;
    
    try {
      const response = mockRequest(method, url, data);
      return Promise.resolve({
        data: response,
        status: response.success ? 200 : 400,
        statusText: response.success ? 'OK' : 'Bad Request',
        headers: {},
        config
      });
    } catch (error) {
      return Promise.reject({
        response: { data: { message: error.message || 'Mock error' }, status: 500 }
      });
    }
  });
}

// Real API interceptor (for when backend is available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !USE_MOCK) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!USE_MOCK && error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;