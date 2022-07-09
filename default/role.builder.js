var roleBuilder = {
    run: function (creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep.say('B: harvest');
        } else if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            // creep.say('🚧 build');
        }

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        // print(targets)

        if (creep.memory.building) {
            if (targets.length) {
                creep.say('tryna build');
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#fcf7f7'}});
                    creep.say('build');
                }
            } else {
                creep.say('tryna repair');
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
                targets.sort((a, b) => a.hits - b.hits);
                if (targets.length > 0) {
                    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                        creep.say('repair');
                    }
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            creep.say('B:tryna harvest');
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('B:h');
            }
        }
    }
};

module.exports = roleBuilder;