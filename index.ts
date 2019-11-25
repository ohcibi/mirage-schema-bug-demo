import { Server, Model, hasMany } from "miragejs"

new Server({
  models: {
    a: Model.extend({
      bs: hasMany()
    }),
    b: Model.extend({
      cs: hasMany()
    }),
    c: Model
  },
  seeds(server) {
    const cs1 = server.createList('c', 100);
    const bs1 = server.createList('b', 10);
    bs1.forEach((b, i) => b.cs = cs1.slice(10*i, 10*i + 10));
    console.log(server.schema.bs.all().models.map(b => b.cs.length));
    // ==> [0, 0, 0, 0, .....]

    server.create('a', { bs: bs1.slice(1) });
    console.log(server.schema.bs.all().models.map(b => b.cs.length));
    // ==> [0, 10, 10, 10, ....

    server.create('a', { bs: bs1 });
    console.log(server.schema.bs.all().models.map(b => b.cs.length));
    // ==> [10, 10, 10, 10, ....

    const cs2 = server.createList('c', 100);
    const bs2 = server.createList('b', 10);
    bs2.forEach((b, i) => b.update({ cs: cs2.slice(10*i, 10*i + 10)}));
    console.log(server.schema.bs.all().models.map(b => b.cs.length));
    // ==> [10, 10, 10, 10, .....]
  }
})
