let ghostLead = 5500;
let ghostHeight = 400;

let level = {
    level1: {
        grounds: [{x: -456, y: 700, width: 4352}, {x: 272, y: 0, width: 1920}, {x: 56, y: -500, width: 2304}],

        // platform location
        platforms:[{x: 1180, y: 550, width: 128}, {x: 1564, y:400, width: 128}, {x: 200, y:-190, width: 128}, 
            {x: 800, y:-650, width: 128}, {x: 1312, y:-800, width: 128}, {x: 1824, y:-950, width: 128}, {x: 1312, y:-1100, width: 128}, 
            {x: 1824, y:-1250, width: 128}, {x: 2208, y:-1401, width: 0}],
       
        // walls
        walls: [{x: -328, y: -708, height: 1536},{x: 1936, y: 1, height: 512}, 
            {x: 2360, y: -1400, height: 2176}, {x: 3640, y: -1348, height: 2176}],
    
        portals: [{x: 0, y: 572, nextLevel:"testingLevel"}],//[{x: 3512, y: 572, nextLevel:"testingLevel"}],
    
        //tree stump locations
        stumps: [],
    
        // monster
        //slimes: [{x: 50, y: 350, boss: true}],
        slimes: [{x: 250, y: 350},{x: 1600, y: 350}, {x: 1200, y: 450}, {x: 1600, y: 350}, 
            {x: 1600, y: -300}, {x: 1300, y: -300},{x: 1400, y: -300}, {x: 550, y: -650},
            {x: 1600, y: -650}, {x: 1200, y: -650}, {x: 1600, y: -650},
            {x: 1600, y: -1450}, {x: 1200, y: -650}, {x: 1400, y: -1650},
            {x: 3000, y: -700, boss: true}],
    
        knights: [],//[{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}
    
        ninjas: [],//[{x: 1100, y: 0}],
    
        ghosts: []
    
    },

    testingLevel: {
        grounds: [{x: -328, y: 700, width: 4224}],

    // platform location
        platforms:[],
   
    // walls
        walls: [{x: -328, y: -708, height: 1536}, {x: 800, y: -708, height: 1536}],

        portals: [{x: 0, y: 572, nextLevel: "level1"}],
    
        stumps: [],
        slimes:[],
        knights: [{x: 600, y: 0}],
        ninjas: [],
        ghosts: []
    }
}   
