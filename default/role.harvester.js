var roleHarvester = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // creep.memory.mainsource = '31ef07748aec3a4'
            // print(creep.memory.mainsource.id)
            let mineMe = Game.getObjectById(creep.memory.mainsource)
            // print(mineMe)
            if (creep.harvest(mineMe) == ERR_NOT_IN_RANGE) {
                creep.say('hNotInRange');
                creep.moveTo(mineMe, {visualizePathStyle: {stroke: '#00ffff'}});
            } else {
                // print(mineMe + ":" + creep.harvest(mineMe))
                creep.say('h:' + creep.store.getUsedCapacity() + "/" + creep.store.getCapacity());
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