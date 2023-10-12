import { Database } from "bun:sqlite";

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./sql/mydb.sqlite"
  }
});

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const server = Bun.serve({
  port: 3001,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/list") {
      if(request.method === POST) {
        const body = await request.json();
        const list = await knex('lists').insert({name: body.name});
        return new Response(JSON.stringify(list), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
      }

      const lists = await knex.select().table('lists');
      return new Response(JSON.stringify(lists), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
    }

    if (url.pathname.startsWith("/list/")) {
      const listId = url.pathname.split("/")[2];

      if (url.pathname === `/list/${listId}`) {
        if(request.method === PUT) {
          const body = await request.json();
          const list = await knex('lists').where({id: listId}).update({name: body.name});
          return new Response(JSON.stringify(list), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
        } else if(request.method === DELETE) {
          const list = await knex('lists').where({id: listId}).del();
          return new Response(JSON.stringify(list), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
        }
          
        const list = await knex('lists').where({id: listId});
        return new Response(JSON.stringify(list), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
      }

      if (url.pathname === `/list/${listId}/item`) {
        if(request.method === POST) {
          const body = await request.json();
          const item = await knex('items').insert({name: body.name, list_id: listId});
          return new Response(JSON.stringify(item), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
        }

        const items = await knex('items').where({list_id: listId});
        return new Response(JSON.stringify(items), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
      }

      if (url.pathname.startsWith(`/list/${listId}/item/`)) {
        if(request.method === PUT) {
          const body = await request.json();
          const itemId = url.pathname.split("/")[4];
          const item = await knex('items').where({id: itemId, list_id: listId}).update({name: body.name});
          console.log("Found Item: ", item)
          return new Response(JSON.stringify(item), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
        } else if(request.method === DELETE) {
          const itemId = url.pathname.split("/")[4];
          const item = await knex('items').where({id: itemId, list_id: listId}).del();
          return new Response(JSON.stringify(item), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
        }

        const itemId = url.pathname.split("/")[4];
        const item = await knex('items').where({id: itemId, list_id: listId});
        return new Response(JSON.stringify(item), { status: 200, statusText: "OK", headers: { "Content-Type": "application/json" } });
      }
    }

    return new Response("404!", { status: 404, statusText: "Not Found" });
  },
});


console.log(`Listening on localhost:${server.port}`);
