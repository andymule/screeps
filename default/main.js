var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

print = console.log.bind(console);

module.exports.loop = function () {
    for (name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (var structID in Game.structures) {
        var tower = Game.getObjectById(structID)
        if (tower.structureType == STRUCTURE_TOWER) {
            // var tower = Game.getObjectById('62c8542a9ac6a44bc31ad983');
            if (tower) {
                const damagedSources = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                const damagedSourcesSorted = _.sortBy(damagedSources, s => tower.pos.getRangeTo(s))
                if (damagedSourcesSorted) {
                    const aa = tower.repair(damagedSourcesSorted[0]);
                    // print(damagedSourcesSorted[0], aa)
                }

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        }
    }

    for (name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

}

// if (Game.spawns[spawner].spawning) {
//     var spawningCreep = Game.creeps[Game.spawns[spawner].spawning.name];
//     Game.spawns[spawner].room.visual.text(
//         '🛠️' + spawningCreep.memory.role,
//         Game.spawns[spawner].pos.x + 1,
//         Game.spawns[spawner].pos.y,
//         {align: 'left', opacity: 0.8});
// }