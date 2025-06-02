const fs = require("fs").promises;
const path = require("path");

async function generateExports() {
  try {
    const SRC_DIR = process.argv[2]
      ? path.resolve(process.cwd(), process.argv[2])
      : null;

    if (!SRC_DIR) {
      throw new Error(
        "❌ Você deve passar o diretório src como argumento. Ex: node scripts/generate-exports.js ./src",
      );
    }

    // Verifica se o diretório existe
    try {
      await fs.access(SRC_DIR);
    } catch {
      throw new Error(`❌ O diretório ${SRC_DIR} não existe!`);
    }

    const INDEX_FILE = path.join(SRC_DIR, "index.ts");
    console.log(`📂 Lendo arquivos do diretório: ${SRC_DIR}`);

    // Função para ler diretório recursivamente
    async function readDirRecursive(dir, baseDir = "") {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files = [];

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(baseDir, entry.name);

        if (entry.isDirectory()) {
          // Ignora diretórios node_modules e .git
          if (entry.name === "node_modules" || entry.name === ".git") {
            continue;
          }
          const subFiles = await readDirRecursive(fullPath, relativePath);
          files.push(...subFiles);
        } else if (
          entry.isFile() &&
          entry.name.endsWith(".ts") &&
          entry.name !== "index.ts" &&
          !entry.name.endsWith(".d.ts") &&
          !entry.name.endsWith(".test.ts") &&
          !entry.name.endsWith(".spec.ts")
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

      // Ordena as categorias e os arquivos dentro de cada categoria
      const sortedGroups = {};
      Object.keys(groups)
        .sort()
        .forEach((category) => {
          sortedGroups[category] = groups[category].sort();
        });

      return sortedGroups;
    }

    // Função para gerar o conteúdo do arquivo index
    function generateIndexContent(groups) {
      let content = "";

      Object.entries(groups).forEach(([category, files]) => {
        if (files.length > 0) {
          content += `\n// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
          files.forEach((file) => {
            const relativePath = file.replace(/\\/g, "/");
            content += `export * from './${relativePath.replace(".ts", "")}';\n`;
          });
        }
      });

      return content.trim();
    }

    const files = await readDirRecursive(SRC_DIR);

    if (files.length === 0) {
      console.log("⚠️ Nenhum arquivo .ts encontrado para exportar!");
      return;
    }

    console.log(`📝 Encontrados ${files.length} arquivos para exportar`);

    const groups = groupFilesByCategory(files);
    const content = generateIndexContent(groups);

    if (!content.trim()) {
      console.log("⚠️ Nenhum conteúdo gerado para o arquivo index.ts!");
      return;
    }

    await fs.writeFile(INDEX_FILE, content);
    console.log(`✅ Arquivo index.ts gerado com sucesso em ${SRC_DIR}!`);
  } catch (error) {
    console.error("❌ Erro ao gerar o arquivo index.ts:", error.message);
    process.exit(1);
  }
}

// Executa o script
generateExports();
