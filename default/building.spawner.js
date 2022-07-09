var buildingSpawner = {
    run: function () {
        for (var spawner in Game.spawns) {
            let thisRoom = Game.spawns[spawner].room

            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == thisRoom);
            if (upgraders.length < 7 && !Game.spawns[spawner].spawning) {
                var newNameU = 'Upgrader' + Game.time;
                // console.log('Spawning new upgrader: ' + newNameU);
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameU, {memory: {role: 'upgrader'}});
            }

            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == thisRoom);
            if (harvesters.length < 4 && !Game.spawns[spawner].spawning) {
                var newNameH = 'Harvester' + Game.time;
                var mysources = thisRoom.find(FIND_SOURCES_ACTIVE)
                var randomItem = mysources[Math.floor(Math.random() * mysources.length)];
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameH, {
                    memory: {
                        role: 'harvester',
                        mainsource: randomItem.id
                    }
                });
            }

            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == thisRoom);
            if (builders.length < 3 && !Game.spawns[spawner].spawning) {
                var newNameB = 'Builder' + Game.time;
                // console.log('Spawning new builder: ' + newNameB);
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameB, {memory: {role: 'builder'}});
            }
        }
    }
};

module.exports = buildingSpawner;