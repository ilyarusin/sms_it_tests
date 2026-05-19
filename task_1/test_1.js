const fileSystem = {
  A: {
    'A1-1': {
      'A2-1': ['file1.txt', 'file2.js']
    },
    'A1-2': ['file3.js', 'file4.js', 'file5.js'],
    'A1-3': ['readme.txt']
  },
  B: {
    'B1-2': ['file11.js', 'file12.js', 'file13.js'],
    'B1-3': ['file15.js'],
    'B1-4': ['file8.js', 'readme.txt']
  }
};

const rootPaths = ['A', 'B'];
const N = 2;

// Собирает пути к конечным папкам, содержащим хотя бы один .js файл
// Разделитель в путях — прямой слеш '/'
// Использован алгоритм DFS
function collectJsFolders(node, currentPath, result) {
  if (Array.isArray(node)) {
    // Подсчёт файлов .js
    const jsCount = node.filter(file => file.endsWith('.js')).length;
    if (jsCount > 0) {
      result.push({ path: currentPath, count: jsCount });
    }
    return;
  }

  // Объект — папка с подпапками
  for (const [name, content] of Object.entries(node)) {
    const newPath = currentPath ? `${currentPath}/${name}` : name;
    collectJsFolders(content, newPath, result);
  }
}

// Разделение на N примерно равных групп
function splitIntoGroups(arr, n) {
  const groups = Array.from({ length: n }, () => []);
  const total = arr.length;
  const baseSize = Math.floor(total / n);
  const remainder = total % n;
  let start = 0;

  for (let i = 0; i < n; i++) {
    const currentSize = baseSize + (i < remainder ? 1 : 0);
    groups[i] = arr.slice(start, start + currentSize);
    start += currentSize;
  }
  return groups;
}

// Сбор результатов
const result = [];
for (const root of rootPaths) {
  if (fileSystem[root]) {
    collectJsFolders(fileSystem[root], root, result);
  }
}

// Разделение на группы
const groups = splitIntoGroups(result, N);

console.log('Исходный массив:');
console.log(result);
console.log(`\nРазделение на группы:`);
groups.forEach((group, idx) => {
  console.log(`\n[${idx + 1}]`);
  group.forEach(item => console.log(item));
});