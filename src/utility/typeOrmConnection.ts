import { getConnectionOptions, createConnection } from 'typeorm';

export const createTypeOrmConnection = async () => {
    const connectionOption = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({ ...connectionOption, name: "default"});
}