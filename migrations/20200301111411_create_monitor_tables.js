exports.up = function(knex) {
    return knex.schema
        .createTable('students', function (table) {
            table.increments('id').primary();
            table.integer('batch');
            table.string('name', 255);
            table.string('email');
            table.string('github_link');
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('assignments', function(table) {
            table.increments('id').primary();
            table.integer('batch');
            table.string('type', 20); // remote & onsite
            table.integer('part'); // remote: 1~4, onsite: 1~15
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('progresses', function (table) {
            table.increments('id').primary();
            table.integer('student_id');
            table.integer('assignment_id');
            table.string("pr_link"); // onsite_only
            table.string("url_link"); // onsite_only
            table.integer('latest_committed_at'); // onsite only
            table.integer('finished_at');
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('progresses')
        .dropTable('assignments')
        .dropTable('students')
};