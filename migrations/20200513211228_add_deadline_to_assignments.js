
exports.up = function(knex) {
    return knex.schema.table('assignments', function(t) {
        t.string('deadline');
    });
};

exports.down = function(knex) {
    return knex.schema.table('assignments', function(t) {
        t.dropColumn('deadline');
    });
};
