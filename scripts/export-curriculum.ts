// Emits curriculum ordering as JSON for the PHP seeder: npm run export:curriculum > database/curriculum.json
import { modules } from '../src/data/curriculum';

console.log(JSON.stringify(modules, null, 2));
