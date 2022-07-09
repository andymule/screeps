var roleBuilder = {
    run: function (creep) {
        for (var spawner in Game.spawns) {
            let thisRoom = Game.spawns[spawner].room
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == thisRoom);
            if (builders.length < 3 && !Game.spawns[spawner].spawning) {
                var newNameB = 'Builder' + Game.time;
                // console.log('Spawning new builder: ' + newNameB);
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameB, {memory: {role: 'builder'}});
            }
        }

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
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#fcf7f7'}});
                    creep.say('build');
                }
            } else {
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
            creep.say('B:harvest');
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;