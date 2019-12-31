exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table.text("email").unique();
      table.text("password").notNullable();

      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.raw("NOW()"));

      table
        .timestamp("last_updated")
        .notNullable()
        .defaultTo(knex.raw("NOW()"));
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
