var roleUpgrader = {
    run: function (creep) {

        for (var spawner in Game.spawns) {
            let thisRoom = Game.spawns[spawner].room
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == thisRoom);
            if (upgraders.length < 7 && !Game.spawns[spawner].spawning) {
                var newNameU = 'Upgrader' + Game.time;
                // console.log('Spawning new upgrader: ' + newNameU);
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameU, {memory: {role: 'upgrader'}});
            }
        }

        // creep.memory.upgrading = false
        // console.log("upgrading1", creep.memory, creep.memory.upgrading, creep.store[RESOURCE_ENERGY], creep.store.getFreeCapacity() )

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            // print(sources)
            // console.log("find free", creep.harvest(sources[0]))
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;