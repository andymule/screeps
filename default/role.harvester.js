var roleHarvester = {
    run: function (creep) {
        for (var spawner in Game.spawns) { // todo put back in spawner class do this doesnt run all the time
            let thisRoom = Game.spawns[spawner].room
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == thisRoom);

            if (harvesters.length < 4 && !Game.spawns[spawner].spawning) {
                var newNameH = 'Harvester' + Game.time;
                // console.log('Spawning new harvester: ' + newNameH);
                var mysources = thisRoom.find(FIND_SOURCES_ACTIVE)
                var randomItem = mysources[Math.floor(Math.random() * mysources.length)];
                // var mySource = Game.getObjectById(randomItem)
                // var mySource = Game.getObjectById('31ef07748aec3a4')
                // creep.memory.mainsource = Game.getObjectById(randomItem)
                Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], newNameH, {
                    memory: {
                        role: 'harvester',
                        mainsource: randomItem
                    }
                });
            }
        }

        if (creep.store.getFreeCapacity() > 0) {
            // creep.memory.mainsource = '31ef07748aec3a4'
            let mineMe = Game.getObjectById(creep.memory.mainsource)
            // print(mineMe)
            if (creep.harvest(mineMe) == ERR_NOT_IN_RANGE) {
                // creep.say('hNotInRange');
                creep.moveTo(mineMe, {visualizePathStyle: {stroke: '#00ffff'}});
            } else {
                // print(mineMe + ":" + creep.harvest(mineMe))
                // creep.say('h:' + creep.store.getUsedCapacity() + "/" + creep.store.getCapacity());
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;