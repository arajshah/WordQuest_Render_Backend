export const fetchBoard = async () => {
  const response = await fetch('http://localhost:4000/api/boards');
  const data = await response.json();
  return data;
};

export const fetchStoryBoard = async () => {
  const response = await fetch('http://localhost:4000/api/story');
  const data = await response.json();
  return data;
};

export const checkWord = async (word) => {
  const response = await fetch('http://localhost:4000/api/check-word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word }),
  });
  const data = await response.json();
  return data;
};