export async function fetchBoard() {
    const response = await fetch('http://localhost:4000/board');
    return response.json();
  }
  
  export async function checkWord(word) {
    const response = await fetch('http://localhost:4000/checkword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word })
    });
    return response.json();
  }
  