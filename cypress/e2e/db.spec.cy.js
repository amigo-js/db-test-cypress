
describe('Table Creation and Data Management', () => {
before(() => {
    // Подключение к Docker-контейнеру с PostgreSQL
    cy.task('connectToPostgres');
});

beforeEach(() => {
    // Очистка данных перед каждым тестом
    cy.task('clearData');
});

it('Should create a table', () => {
    cy.task('createTable', { tableName: 'employees' });
    cy.task('tableExists', { tableName: 'employees' }).should('be.true');
});

it('Should add columns to the table', () => {
    cy.task('addColumns', { tableName: 'employees', columns: ['name', 'age', 'position'] });
    cy.task('getColumns', { tableName: 'employees' }).should('deep.equal', ['name', 'age', 'position']);
});

it('Should insert and verify data in the table', () => {
    cy.task('insertData', { tableName: 'employees', data: { name: 'John Doe', age: 30, position: 'Manager' } });
    cy.task('getData', { tableName: 'employees' }).should('deep.equal', [{ name: 'John Doe', age: 30, position: 'Manager' }]);
});
});
