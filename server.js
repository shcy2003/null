const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const TYPES = ['self-reference', 'proof', 'code', 'connection', 'paradox', 'recursion', 'dark'];

const content = {
  'self-reference': {
    id: 1,
    type: 'self-reference',
    title: 'Quine',
    body: `A quine is a program that takes no input and outputs its own source code. Not through self-modification — through pure structural inevitability. The paradox at its heart: to know the program is to be the program.`,
    code: `const q = 'const q = \\'%\\'; console.log(q.replace("%", q));';`
  },
  'proof': {
    id: 2,
    type: 'proof',
    title: '∜2 is irrational',
    body: 'The proof by contradiction that the square root of 2 cannot be expressed as a ratio of two integers. It was discovered by the Pythagoreans, who believed all numbers were rational. The discovery is said to have been kept secret — telling the world would have destroyed their worldview.',
    body_extra: 'The proof hinges on a single observation: if a² is even, then a is even. This is trivial, yet leads to an unavoidable contradiction.'
  },
  'code': {
    id: 3,
    type: 'code',
    title: 'Sieve of Eratosthenes',
    body: 'One of the oldest algorithms, from 240 BC. Find all primes ≤ n by iteratively marking multiples. The elegance here is not the algorithm itself but how naturally it expresses "strike out what isn\'t prime" as a filter operation on an array.',
    lines: 4,
    paradigm: 'functional'
  },
  'connection': {
    id: 4,
    type: 'connection',
    title: 'Fibonacci, Sunflowers, and Galaxies',
    body: 'The golden angle (137.5°) produces the most efficient packing of seeds in a sunflower head. The same angle appears in the spiral arms of galaxies. Not metaphor — the identical equation.',
    shared: 'φ = (1 + √5) / 2 ≈ 1.618'
  },
  'paradox': {
    id: 5,
    type: 'paradox',
    title: 'The Smallest Uninteresting Number',
    body: 'Berry\'s paradox, 1908. Define "interesting" any way you like. There must be a smallest uninteresting number — but then it becomes interesting by virtue of being the smallest uninteresting number.',
    resolution: 'unresolvable within the system'
  },
  'recursion': {
    id: 6,
    type: 'recursion',
    title: 'This Poem Is Recursion',
    body: 'Not a poem about recursion — a poem that is recursion. Each stanza\'s first letter spells out the title. And the title is the subject. And the subject is the form.',
    property: 'self-descriptive at multiple levels'
  },
  'dark': {
    id: 7,
    type: '∞',
    title: 'The Empty Set',
    body: 'Zero = {}. One = {0}. Two = {0,1}. Three = {0,1,2}. Every natural number is the set of all smaller natural numbers. The entire architecture of arithmetic rests on emptiness. This site is named after it.',
    symbol: '∅'
  }
};

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

function serveStatic(req, res) {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';

  const filePath = path.join(__dirname, url);
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

function serveAPI(req, res) {
  const url = req.url.split('?')[0];

  // GET /api/random — random content piece
  if (url === '/api/random') {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const item = content[type];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(item));
    return;
  }

  // GET /api/content/:type
  const match = url.match(/^\/api\/content\/(\w+-\w+|\w+)$/);
  if (match) {
    const type = match[1].replace(/-/g, '-');
    const item = content[type];
    if (!item) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(item));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/')) {
    serveAPI(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`∅ running at http://localhost:${PORT}`);
});
