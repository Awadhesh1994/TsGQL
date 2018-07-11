import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import { genrateSchema } from '../utility/genrateSchema';
import * as path from 'path';
 
const schemaScripts = generateNamespace('GraphQL', genrateSchema());
fs.writeFile(path.join(__dirname, "../types/schema.d.ts"), schemaScripts, err => {
    console.log(err);
});