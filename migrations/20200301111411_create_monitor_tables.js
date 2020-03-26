exports.up = function(knex) {
    return knex.schema
        .createTable('students', function (table) {
            table.increments('id').primary();
            table.integer('batch');
            table.string('name', 255);
            table.string('email');
            table.string('github_link');
            table.string('server');
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('assignments', function(table) {
            table.increments('id').primary();
            table.integer('batch');
            table.integer('part'); // 1~15
            table.string('name'); // week_0_part1
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('progresses', function (table) {
            table.increments('id').primary();
            table.integer('student_id');
            table.integer('assignment_id');
            table.string("pr_link");
            table.string("url_link");
            table.timestamp('latest_committed_at').nullable();
            table.integer("status_id");
            table.timestamp('finished_at').nullable();
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.unique(['student_id', 'assignment_id'], 'student_assignment');
        })
        .createTable('status', function (table) {
            table.increments('id').primary();
            table.string("name"); // error, checked, pass
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('status')
        .dropTable('progresses')
        .dropTable('assignments')
        .dropTable('students')
};