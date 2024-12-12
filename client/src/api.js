// Client/src/api.js

const API_BASE_URL = 'https://<your-firebase-backend-url>.cloudfunctions.net/api';

export const fetchBoard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards`);
    if (!response.ok) {
      throw new Error('Failed to fetch board');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchBoard:', error);
    throw error;
  }
};

export const fetchStoryBoard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/story`);
    if (!response.ok) {
      throw new Error('Failed to fetch story board');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchStoryBoard:', error);
    throw error;
  }
};

export const checkWord = async (word) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    });
    if (!response.ok) {
      throw new Error('Failed to check word');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in checkWord:', error);
    throw error;
  }
};
