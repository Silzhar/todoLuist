/**
 * Usaremos este archivo para configurar rápidamente una base de datos
 * en formato JSON en nuestro frontend. De esta forma podremos simular la
 * carga de información de una API sin necesidad de crear una desde cero.
 */
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

// Añadimos valires por defecto a nuestra nueva DB
db.defaults({ todos: [], completed: [] }).write();

export default db;
