const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../src");
const INDEX_FILE = path.join(SRC_DIR, "index.ts");

// Função para ler recursivamente os diretórios
function readDirRecursive(dir, baseDir = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...readDirRecursive(fullPath, relativePath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      entry.name !== "index.ts"
    ) {
      files.push(relativePath);
    }
  }

  return files;
}

// Função para agrupar arquivos por categoria
function groupFilesByCategory(files) {
  const groups = {};

  files.forEach((file) => {
    const category = path.dirname(file).split(path.sep).pop();
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(file);
  });

  return groups;
}

// Função para gerar o conteúdo do arquivo index.ts
function generateIndexContent(groups) {
  let content = "";

  Object.entries(groups).forEach(([category, files]) => {
    content += `\n// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
    files.forEach((file) => {
      const relativePath = file.replace(/\\/g, "/");
      content += `export * from "./${relativePath.replace(".ts", "")}";\n`;
    });
  });

  return content.trim();
}

// Função principal
function generateExports() {
  try {
    // Lê todos os arquivos .ts recursivamente
    const files = readDirRecursive(SRC_DIR);

    // Agrupa os arquivos por categoria
    const groups = groupFilesByCategory(files);

    // Gera o conteúdo do arquivo index.ts
    const content = generateIndexContent(groups);

    // Escreve o arquivo index.ts
    fs.writeFileSync(INDEX_FILE, content);

    console.log("✅ Arquivo index.ts gerado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao gerar o arquivo index.ts:", error);
    process.exit(1);
  }
}

generateExports();
