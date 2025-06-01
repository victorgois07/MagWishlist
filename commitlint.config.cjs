module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Novas features
        'fix',      // Correção de bugs
        'docs',     // Documentação
        'style',    // Formatações que não afetam o código
        'refactor', // Refatoração sem mudanças funcionais
        'perf',     // Melhorias de performance
        'test',     // Adição ou modificação de testes
        'chore',    // Mudanças no build, ferramentas, etc
        'ci',       // Mudanças na integração contínua
        'build',    // Mudanças que afetam o sistema de build
        'revert',   // Reverte um commit anterior
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-max-length': [2, 'always', 72],
  },
};