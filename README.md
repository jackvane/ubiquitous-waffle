# Oops

There's a bug here:

```
me@macbook edgedb_bug_repro % npx esbuild-runner dbschema/scripts/seed.ts
TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property '__pointers__' -> object with constructor 'Object'
    |     property 'currency' -> object with constructor 'Object'
    |     ...
    |     property '<currency[is User]' -> object with constructor 'Object'
    --- property 'target' closes the circle
    at JSON.stringify (<anonymous>)
    at Object.$resolveOverload (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/edgeql-js/syntax/funcops.js:44:55)
    at Object.op (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/edgeql-js/operators.js:379:72)
    at /Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/scripts/seed.ts:127:17
    at resolveShape (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/edgeql-js/syntax/select.js:235:61)
    at Object.select (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/edgeql-js/syntax/select.js:205:47)
    at seedJobs (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/scripts/seed.ts:123:6)
    at main (/Users/me/Code/dumpster/edgedb_bug_repro/dbschema/scripts/dbschema/scripts/seed.ts:252:9)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

# Running This

Initial the EdgeDB project

```
edgedb project init
```

Generate the TS driver

```
npx edgeql-js
```

Run the seed script

```
npx esbuild-runner dbschema/scripts/seed.ts
```

# Debugging

If you comment out L127, the script will run. Only I really need want this to run with L127 ...

_dbschema/scripts/seed.ts_

```ts
const professions = await e
  .select(e.Profession, (profession) => ({
    id: true,
    title: true,
    industry: true,
    // filter: e.op(profession.industry, "=", e.Industry.Information_Technology),
  }))
  .run(client);
```
