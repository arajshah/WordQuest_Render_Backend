class BoggleSolver {
  constructor(board, dictionary) {
    this.board = board.map(row => row.map(cell => cell.toUpperCase()));
    this.dictionary = new Set(dictionary.map(word => word.toUpperCase()));
    this.prefixes = this.buildPrefixes(this.dictionary);
    this.rows = this.board.length;
    this.cols = this.board[0].length;
    this.directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0], [1, 1],
    ];
    this.foundWords = new Set();
  }

  buildPrefixes(dictionary) {
    const prefixes = new Set();
    for (const word of dictionary) {
      for (let i = 1; i < word.length; i++) {
        prefixes.add(word.slice(0, i));
      }
    }
    return prefixes;
  }

  isValidGrid() {
    if (!this.board || !this.board.length || !this.board[0].length) {
      return false;
    }
    const rowLengths = new Set(this.board.map(row => row.length));
    return rowLengths.size === 1;
  }

  dfs(i, j, visited, currentWord) {
    if (
      i < 0 || i >= this.rows ||
      j < 0 || j >= this.cols ||
      visited[i][j]
    ) {
      return;
    }

    currentWord.push(this.board[i][j]);
    let extraChars = 0;

    if (this.board[i][j] === 'Q') {
      currentWord.push('U');
      extraChars += 1;
    }

    const word = currentWord.join('');

    if (!this.prefixes.has(word) && !this.dictionary.has(word)) {
      for (let k = 0; k < 1 + extraChars; k++) {
        currentWord.pop();
      }
      return;
    }

    if (word.length >= 3 && this.dictionary.has(word)) {
      this.foundWords.add(word);
    }

    visited[i][j] = true;
    for (const [dx, dy] of this.directions) {
      this.dfs(i + dx, j + dy, visited, currentWord);
    }

    visited[i][j] = false;
    for (let k = 0; k < 1 + extraChars; k++) {
      currentWord.pop();
    }
  }

  getSolutions() {
    if (!this.isValidGrid()) {
      return [];
    }
    this.foundWords.clear();
    const visited = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.dfs(i, j, visited, []);
      }
    }
    return Array.from(this.foundWords);
  }
}

export default BoggleSolver;