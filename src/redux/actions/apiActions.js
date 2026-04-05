// API Actions - Centralized API call handlers

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

// ==================== AUTH ACTIONS ====================

export const loginUser = createAsyncThunk(
  'api/auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'api/auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      toast.success('Registration successful! Please login.');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'api/auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load user';
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'api/auth/verify-email',
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      toast.success('Email verified successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'api/auth/forgot-password',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      toast.success('Password reset email sent!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'api/auth/reset-password',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      toast.success('Password reset successful!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'api/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// ==================== POST ACTIONS ====================

export const fetchPosts = createAsyncThunk(
  'api/posts/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, type, search } = params;
      const queryParams = new URLSearchParams({ page, limit, ...(type && { type }), ...(search && { search }) });
      const response = await api.get(`/posts?${queryParams}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch posts';
      return rejectWithValue(message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'api/posts/fetchById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch post';
      return rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  'api/posts/create',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('/posts', postData);
      toast.success('Post created successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'api/posts/update',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/${postId}`, postData);
      toast.success('Post updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'api/posts/delete',
  async (postId, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${postId}`);
      toast.success('Post deleted successfully!');
      return postId;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const likePost = createAsyncThunk(
  'api/posts/like',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to like post';
      return rejectWithValue(message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  'api/posts/unlike',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to unlike post';
      return rejectWithValue(message);
    }
  }
);

export const commentOnPost = createAsyncThunk(
  'api/posts/comment',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { content });
      toast.success('Comment added!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'api/posts/delete-comment',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      toast.success('Comment deleted!');
      return { postId, commentId };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete comment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const sharePost = createAsyncThunk(
  'api/posts/share',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/share`);
      toast.success('Post shared!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to share post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ==================== USER ACTIONS ====================

export const updateUserProfile = createAsyncThunk(
  'api/user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put('/users/profile', profileData);
      toast.success('Profile updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'api/user/uploadPhoto',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/profile-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Profile photo updated!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to upload photo';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'api/user/stats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch stats';
      return rejectWithValue(message);
    }
  }
);

export const fetchUserActivity = createAsyncThunk(
  'api/user/activity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/activity');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch activity';
      return rejectWithValue(message);
    }
  }
);

export const searchUsers = createAsyncThunk(
  'api/user/search',
  async ({ query, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/search', { params: { q: query, ...filters } });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to search users';
      return rejectWithValue(message);
    }
  }
);

// ==================== APPOINTMENT ACTIONS ====================

export const fetchAppointments = createAsyncThunk(
  'api/appointments/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/appointments', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch appointments';
      return rejectWithValue(message);
    }
  }
);

export const createAppointmentRequest = createAsyncThunk(
  'api/appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      toast.success('Appointment request sent!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create appointment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'api/appointments/updateStatus',
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}/status`, { status });
      toast.success(`Appointment ${status}!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update appointment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchFacultySlots = createAsyncThunk(
  'api/appointments/faculty-slots',
  async (facultyId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/appointments/faculty/${facultyId}/slots`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch slots';
      return rejectWithValue(message);
    }
  }
);

export const setFacultyAvailability = createAsyncThunk(
  'api/appointments/setAvailability',
  async (slots, { rejectWithValue }) => {
    try {
      const response = await api.post('/appointments/availability', { slots });
      toast.success('Availability updated!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to set availability';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ==================== NOTIFICATION ACTIONS ====================

export const fetchNotifications = createAsyncThunk(
  'api/notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch notifications';
      return rejectWithValue(message);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  'api/notifications/markRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to mark as read';
      return rejectWithValue(message);
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  'api/notifications/markAllRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.put('/notifications/read-all');
      toast.success('All notifications marked as read');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to mark all as read';
      return rejectWithValue(message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'api/notifications/delete',
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      toast.success('Notification deleted');
      return notificationId;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete notification';
      return rejectWithValue(message);
    }
  }
);

// ==================== REWARD ACTIONS ====================

export const fetchRewards = createAsyncThunk(
  'api/rewards/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/rewards');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch rewards';
      return rejectWithValue(message);
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  'api/rewards/leaderboard',
  async ({ limit = 10, department = 'all' } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/rewards/leaderboard', { params: { limit, department } });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch leaderboard';
      return rejectWithValue(message);
    }
  }
);

export const fetchUserRewards = createAsyncThunk(
  'api/rewards/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/rewards/user');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch user rewards';
      return rejectWithValue(message);
    }
  }
);

// ==================== ADMIN ACTIONS ====================

export const fetchAllUsers = createAsyncThunk(
  'api/admin/users',
  async ({ page = 1, limit = 10, role, search } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users', { params: { page, limit, role, search } });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch users';
      return rejectWithValue(message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'api/admin/updateRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, { role });
      toast.success('User role updated!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update role';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const suspendUser = createAsyncThunk(
  'api/admin/suspendUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/suspend`);
      toast.success('User suspended');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to suspend user';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const moderateContent = createAsyncThunk(
  'api/admin/moderateContent',
  async ({ contentId, action, reason }, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/moderate', { contentId, action, reason });
      toast.success(`Content ${action}ed successfully`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to moderate content';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'api/admin/analytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/analytics');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch analytics';
      return rejectWithValue(message);
    }
  }
);

// ==================== UNIVERSITY ACTIONS ====================

export const fetchUniversities = createAsyncThunk(
  'api/universities/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/universities');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch universities';
      return rejectWithValue(message);
    }
  }
);

export const updateUniversityTheme = createAsyncThunk(
  'api/universities/updateTheme',
  async ({ universityId, theme }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/universities/${universityId}/theme`, theme);
      toast.success('University theme updated!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update theme';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ==================== MENTORSHIP ACTIONS ====================

export const fetchMentors = createAsyncThunk(
  'api/mentorship/mentors',
  async ({ department, specialization } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/mentorship/mentors', { params: { department, specialization } });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch mentors';
      return rejectWithValue(message);
    }
  }
);

export const requestMentorship = createAsyncThunk(
  'api/mentorship/request',
  async ({ mentorId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post('/mentorship/request', { mentorId, message });
      toast.success('Mentorship request sent!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send request';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const respondToMentorship = createAsyncThunk(
  'api/mentorship/respond',
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/mentorship/request/${requestId}`, { status });
      toast.success(`Request ${status}!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to respond';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ==================== HELPER FUNCTIONS ====================

export const clearApiError = (actionType) => ({
  type: `${actionType}/clearError`
});

export const resetApiState = (actionType) => ({
  type: `${actionType}/reset`
});

// Export all actions as a group
const apiActions = {
  // Auth
  loginUser,
  registerUser,
  getCurrentUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logoutUser,
  
  // Posts
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
  sharePost,
  
  // User
  updateUserProfile,
  uploadProfilePhoto,
  fetchUserStats,
  fetchUserActivity,
  searchUsers,
  
  // Appointments
  fetchAppointments,
  createAppointmentRequest,
  updateAppointmentStatus,
  fetchFacultySlots,
  setFacultyAvailability,
  
  // Notifications
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  
  // Rewards
  fetchRewards,
  fetchLeaderboard,
  fetchUserRewards,
  
  // Admin
  fetchAllUsers,
  updateUserRole,
  suspendUser,
  moderateContent,
  fetchAnalytics,
  
  // University
  fetchUniversities,
  updateUniversityTheme,
  
  // Mentorship
  fetchMentors,
  requestMentorship,
  respondToMentorship
};

export default apiActions;