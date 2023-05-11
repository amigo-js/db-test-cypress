const { setupDb } = require('./setup-db');

module.exports = (on, config) => {
  // Настройка базы данных перед запуском тестов
  on('task', {
    setupDb: async () => {
      await setupDb();
      return null;
    }
  });

  // Очистка базы данных после завершения всех тестов
  on('task', {
    clearDb: async () => {
      // Выполните здесь код для очистки базы данных
      return null;
    }
  });

  return config;
};
