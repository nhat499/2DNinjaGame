let ghostLead = 5500;
let ghostHeight = 1700;

let level = {
    level1: {
        // width has to be a mutiple of 128
        grounds: [{x: -456, y: 700, width: 4352}, {x: 272, y: 0, width: 1920}, {x: 56, y: -500, width: 2304}],

        // platform location // width has to be mutiple for 128
        platforms:[{x: 1180, y: 550, width: 128}, {x: 1564, y:400, width: 128}, {x: 200, y:-190, width: 128}, 
            {x: 800, y:-650, width: 128}, {x: 1312, y:-800, width: 128}, {x: 1824, y:-950, width: 128}, {x: 1312, y:-1100, width: 128}, 
            {x: 1824, y:-1250, width: 128}, {x: 2208, y:-1401, width: 0}],
       
        // walls
        walls: [{x: -328, y: -708, height: 1536},{x: 1936, y: 1, height: 512}, 
            {x: 2360, y: -1400, height: 2176}, {x: 3640, y: -1348, height: 2176}],
    
        portals: [{x: 3512, y: 572, nextLevel:"level2"}],
    
        //tree stump locations
        stumps: [],
    
        // monster
        //slimes: [{x: 50, y: 350, boss: true}],
        slimes: [{x: 250, y: 350},{x: 1600, y: 350}, {x: 1200, y: 450}, {x: 1600, y: 350}, {x: 800, y: -800}, {x: 1400, y: - 1000}, {x: 1900, y: -1300}, {x: 1900, y: -1800}, {x: 2200, y: -2000}, 
            {x: 1600, y: -300}, {x: 1300, y: -300},{x: 1400, y: -300}, {x: 550, y: -650},
            {x: 1600, y: -650}, {x: 1200, y: -650}, {x: 1600, y: -650},
            {x: 1600, y: -1450}, {x: 1200, y: -650}, {x: 1400, y: -1650},
            {x: 3000, y: -700, boss: true}],
    
        knights: [],//[{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}
    
        ninjas: [],//[{x: 1100, y: 0}],
    
        ghosts: []
    
    },

    level2: {
        // width has to be a mutiple of 128
        grounds: [{x: -456, y: 2000, width: 512}],

        // platform location
        platforms:[{x: 350, y: 2000, width: 128}, {x: 850, y:1900, width: 128}, {x: 1350, y:1800, width: 128}, 
            {x: 800, y:1650, width: 128}, {x: 350, y:1500, width: 128}, {x: 800, y:1400, width: 128}, {x: 1300, y:1300, width: 384},
            {x: 2000, y:1400, width: 128}, {x: 2500, y:1500, width: 128}, {x: 3000, y:1650, width: 128}, {x: 1500, y: 100, width: 1024}],
       
        // walls
        walls: [{x: 3350, y: 0, height: 1600}, {x: 2900, y: 0, height: 1300}],
    
        portals: [{x: 3512, y: 572, nextLevel:"testingLevel"}],
    
        //tree stump locations
        stumps: [],
    
        // monster
        //slimes: [{x: 50, y: 350, boss: true}],
        slimes: [{x: 350, y: 1500}, {x: 850, y: 1700}, {x: 350, y: 1300}, {x: 350, y: 1300}, {x:2000, y:1300}, {x: 1800, y: -500, boss: true}],
            // [{x: 850, y: 2000}, {x: 1200, y: 450}, {x: 1600, y: 350}, 
            // {x: 1600, y: -300}, {x: 1300, y: -300},{x: 1400, y: -300}, {x: 550, y: -650},
            // {x: 1600, y: -650}, {x: 1200, y: -650}, {x: 1600, y: -650},
            // {x: 1600, y: -1450}, {x: 1200, y: -650}, {x: 1400, y: -1650},
            // {x: 3000, y: -700, boss: true}],
    
        knights: [{x:1300, y:1100}, {x:3000, y: 1000}],//[{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}
    
        ninjas: [{x: 0, y:1700}],//[{x: 1100, y: 0}], {x: 1350, y: 1500}
    
        ghosts: [{x: 2000, y: ghostHeight}, {x: 2500, y: ghostHeight}, {x: 3000, y: ghostHeight}, {x: 3500, y: ghostHeight}, {x: 4000, y: ghostHeight},
            {x: 4500, y: ghostHeight}, {x: 5000, y: ghostHeight}, {x: 5500, y: ghostHeight}, {x: 6000, y: ghostHeight}, {x: 6500, y: ghostHeight}, 
            {x: 7000, y: ghostHeight}, {x: 7500, y: ghostHeight}, {x: 8000, y: ghostHeight}, {x: 8500, y: ghostHeight}, {x: 9000, y: ghostHeight}]
    
    },

    testingLevel: {
        // width has to be a mutiple of 
        grounds: [{x: -328, y: 700, width: 4224}],

    // platform location
    // width has to be a mutiple of 
        platforms:[],
   
    // walls
    // hieght has to be a mutiple of 
        walls: [{x: -328, y: -708, height: 1536}],

        portals: [{x: 0, y: 572, nextLevel: "level1"}],
    
        stumps: [],
        slimes:[{x: 600, y: 0, boss: true}],
        knights: [],//[{x: 600, y: 0}, {x: 900, y: 0} ,{x: 1000, y: 0}, {x: 1200, y: 0}],
        ninjas: [], //[{x: 1500, y: 0},  {x: 1700, y: 0}, {x: 1900, y: 0}, {x: 2100, y: 0}],
        ghosts: []
    }
}   
