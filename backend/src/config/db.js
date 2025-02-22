import {MongoClient,Db} from 'mongodb';
let uri=process.env.MONGO_URI;
let db=process.env.MONGO_DB;

if(!uri){
    throw new Error("Mongo Url is missing");
} 
if(!db){
    throw new Error("Mongo DB name is missing");
}
export async function connectdb(){
    if(cachedclient && cacheddatabase){
        return {client:cachedclient,database:cacheddatabase};
    }
    const client=new MongoClient(uri);
    await client.connect();
    const database=client.db(db);  
    cachedclient=client;
    cacheddatabase=database;
    return {client,database}; 


}