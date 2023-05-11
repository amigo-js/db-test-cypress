
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Очистка базы данных после завершения всех тестов
      on('task', {
        clearData: async () => {
          // Выполните здесь код для очистки базы данных
          await postgresClient.query('DELETE FROM employees;');
          return null;
        },
        connectToPostgres: async () => {
          // Выполните здесь код для подключения к PostgreSQL
          // Пример:
          const { Client } = require('pg');
          const postgresClient = new Client({
            host: 'localhost',
            port: 5432,
            user: 'testuser',
            password: 'password',
            database: 'testdb',
          });
          await postgresClient.connect();
          return null;
        },
        createTable: async ({ tableName }) => {
          // Выполните здесь код для создания таблицы в PostgreSQL с указанным именем tableName
          // Пример:
          await postgresClient.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(255));`);
          return null;
        },
        tableExists: async ({ tableName }) => {
          // Выполните здесь код для проверки существования таблицы в PostgreSQL с указанным именем tableName
          // Пример:
          const result = await postgresClient.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}');`);
          const tableExists = result.rows[0].exists;
          return tableExists;
        },
        addColumns: async ({ tableName, columns }) => {
          // Выполните здесь код для добавления столбцов в таблицу в PostgreSQL
          // Пример:
          for (const column of columns) {
            await postgresClient.query(`ALTER TABLE ${tableName} ADD COLUMN ${column} VARCHAR(255);`);
          }
          return null;
        },
        getColumns: async ({ tableName }) => {
          // Выполните здесь код для получения столбцов таблицы в PostgreSQL
          // Пример:
          const result = await postgresClient.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}';`);
          const columns = result.rows.map(row => row.column_name);
          return columns;
        },
        insertData: async ({ tableName, data }) => {
          // Выполните здесь код для вставки данных в таблицу в PostgreSQL
          // Пример:
          const columns = Object.keys(data).join(', ');
          const values = Object.values(data).map(value => `'${value}'`).join(', ');
          await postgresClient.query(`INSERT INTO ${tableName} (${columns}) VALUES (${values});`);
          return null;
        },
        getData: async ({ tableName }) => {
          // Выполните здесь код для получения данных из таблицы в PostgreSQL
          // Пример:
          const result = await postgresClient.query(`SELECT * FROM ${tableName};`);
          const data = result.rows;
          return data;
        },
      });

      return config;
    }
  }
});




// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // Очистка базы данных после завершения всех тестов
//       on('task', {
//         clearData: async () => {
//           // Выполните здесь код для очистки базы данных
//           return null;
//         },
//         connectToPostgres: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         createTable: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         tableExists: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         addColumns: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         getColumns: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         insertData: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },
//         getData: async () => {
//           // Выполните здесь код для подключения к PostgreSQL
//           return null;
//         },

//       });

//       return config;
//     }
//   }
// })



// const { setupDb } = require('./setup-db');

// module.exports = (on, config) => {
//   // Настройка базы данных перед запуском тестов
//   on('task', {
//     setupDb: async () => {
//       await setupDb();
//       return null;
//     }
//   });

//   // Очистка базы данных после завершения всех тестов
//   on('task', {
//     clearDb: async () => {
//       // Выполните здесь код для очистки базы данных
//       return null;
//     }
//   });

//   return config;
// };
