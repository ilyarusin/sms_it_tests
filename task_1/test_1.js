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

function collectJsFolders(node, currentPath, result) {
  if (Array.isArray(node)) {
    const jsCount = node.filter(file => file.endsWith('.js')).length;
    if (jsCount > 0) {
      result.push(`${currentPath} (${jsCount})`);
    }
    return;
  }
  for (const [name, content] of Object.entries(node)) {
    const newPath = currentPath ? `${currentPath}/${name}` : name;
    collectJsFolders(content, newPath, result);
  }
}

const result = [];
for (const root of rootPaths) {
  if (fileSystem[root]) {
    collectJsFolders(fileSystem[root], root, result);
  }
}

console.log(result);