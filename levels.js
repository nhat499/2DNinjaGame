let ghostLead = 5500;
let ghostHeight = 1700;
let ghostHeight2 = -800
let ghostHeight3 = -500
let ghostHeight4 = -1000
let ghostHeight5 = -1250

let level = {
    trainLevel: {
        grounds: [{x: -456, y: 700, width: 1536}, {x: 824, y: 957, width: 768}, {x: 1336, y: 700, width: 2816}],

        // platform location
        platforms:[{x: 1900, y: 550, width: 128},
            {x: 3140, y: 550, width: 128}], // {x: 1180, y: 550, width: 128}
       
        // walls
        walls: [{x: -512, y: -708, height: 1536}, 
            {x: 824, y: 701, height: 256},
            {x: 1336, y: 701, height: 256},
            {x: 2300, y: 230, height: 384},
            {x: 2756, y: 188, height: 512},
            {x: 3896, y: 0, height: 700}
        ],
    
        portals: [{x: 3770, y: 572, nextLevel:"level1"}],

        signs: [{x: 30, y: 635, text: "arrow keys to move"}, 
        {x: 824, y: 635, text: "Space to jump"},
        {x: 1600, y: 635, text: "Double jump can be preform"},
        {x: 2000, y: 485, text: "Walk toward wall to grab it"},
        {x: 2200, y: 635, text: "Hold S to slide"},
        {x: 2656, y: 635, text: "jump side to side to get up"},
        {x: 3140, y: 485, text: "A to attack"}],
        
    
        //tree stump locations
        stumps: [{x:1085, y:865}],
    
        // monster
        //slimes: [{x: 50, y: 350, boss: true}],
        slimes: [{x: 3856, y: 500}],
    
        knights: [],//[{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}
    
        ninjas: [],//[{x: 1100, y: 0}],
    
        ghosts: [],

        mainNinja: [{x:0, y:570}]
    
    },

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
    
        portals: [{x: 500, y: 572, nextLevel:"trainLevel"},{x: 3512, y: 572, nextLevel:"level2"}],
    
        signs: [],

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
    
        ghosts: [],
        mainNinja: [{x:103, y:570}]
    },

    level2: {
        // width has to be a mutiple of 128
        grounds: [{x: -456, y: 2000, width: 512}],

        // platform location
        platforms:[{x: 350, y: 2000, width: 128}, {x: 850, y:1900, width: 128}, {x: 1350, y:1800, width: 128}, 
            {x: 800, y:1650, width: 128}, {x: 350, y:1500, width: 128}, {x: 800, y:1400, width: 128}, {x: 1300, y:1300, width: 384},
            {x: 2000, y:1400, width: 128}, {x: 2500, y:1500, width: 128}, {x: 3000, y:1650, width: 128}, {x: 1500, y: 100, width: 1024},
        
            {x: 1000, y: -50, width: 128}, {x: 500, y: -150, width: 128}, {x: 0, y: -250, width: 128}, {x: 500, y: -350, width: 128}, {x: 1000, y: -450, width: 128},
            {x: 1500, y: -550, width: 128}, {x: 1000, y: -650, width: 128}, {x: 1500, y: -750, width: 128}, {x: 2000, y: -850, width: 128}, {x: 1500, y: -950, width: 128},

            {x: 2000, y: -1050, width: 128}, {x: 2500, y: -1150, width: 128}, {x: 3000, y: -1250, width: 128}, {x: 2500, y: -1350, width: 128},
            {x: 1000, y: -1450, width: 1024}],
       
        // walls
        walls: [{x: 3350, y: 0, height: 1600}, {x: 2900, y: 0, height: 1300}],
    
        portals: [{x: 3512, y: 572, nextLevel:"testingLevel"}],

        signs: [],
    
        //tree stump locations
        stumps: [],
    
        // monster
        //slimes: [{x: 50, y: 350, boss: true}],
        slimes: [{x: 350, y: 1500}, {x: 850, y: 1700}, {x: 350, y: 1300}, {x: 350, y: 1300}, {x:2000, y:1300}, {x: 1700, y: -200}, {x: 1900, y: -200}, {x: 2100, y: -200}, {x: 2300, y: -200}, 
                {x: 2100, y: -1150}, {x: 2600, y: -1250}, {x: 3100, y: -1350}, {x: 2600, y: -1450}, {x: 1500, y: -1850, boss: true}],
            // [{x: 850, y: 2000}, {x: 1200, y: 450}, {x: 1600, y: 350}, 
            // {x: 1600, y: -300}, {x: 1300, y: -300},{x: 1400, y: -300}, {x: 550, y: -650},
            // {x: 1600, y: -650}, {x: 1200, y: -650}, {x: 1600, y: -650},
            // {x: 1600, y: -1450}, {x: 1200, y: -650}, {x: 1400, y: -1650},
            // {x: 3000, y: -700, boss: true}],
    
        knights: [{x:1300, y:1100}, {x:3000, y: 1000}, {x: 1600, y: -300}, {x: 1800, y: -300}, {x: 2000, y: -300}],//[{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}
    
        ninjas: [],//[{x: 1100, y: 0}], {x: 1350, y: 1500}, {x: 0, y:1700} these are for the level -> {x: 800, y: 1450}, {x: 800, y: 1200}
    
        ghosts: [{x: 2000, y: ghostHeight}, {x: 2500, y: ghostHeight}, {x: 3000, y: ghostHeight}, {x: 3500, y: ghostHeight}, {x: 4000, y: ghostHeight},
            {x: 4500, y: ghostHeight}, {x: 5000, y: ghostHeight}, {x: 5500, y: ghostHeight}, {x: 6000, y: ghostHeight}, {x: 6500, y: ghostHeight}, 
            {x: 7000, y: ghostHeight}, {x: 7500, y: ghostHeight}, {x: 8000, y: ghostHeight}, {x: 8500, y: ghostHeight}, {x: 9000, y: ghostHeight},
        
            {x: 3500, y: ghostHeight2}, {x: 2500, y: ghostHeight2}, {x: 3000, y: ghostHeight2}, {x: 3500, y: ghostHeight2}, {x: 4000, y: ghostHeight2},
            {x: 4500, y: ghostHeight2}, {x: 5000, y: ghostHeight2}, {x: 5500, y: ghostHeight2}, {x: 6000, y: ghostHeight2}, {x: 6500, y: ghostHeight2}, 
            {x: 7000, y: ghostHeight2}, {x: 7500, y: ghostHeight2}, {x: 8000, y: ghostHeight2}, {x: 8500, y: ghostHeight2}, {x: 9000, y: ghostHeight2},

            {x: 3500, y: ghostHeight3}, {x: 2500, y: ghostHeight3}, {x: 3000, y: ghostHeight3}, {x: 3500, y: ghostHeight3}, {x: 4000, y: ghostHeight3},
            {x: 4500, y: ghostHeight3}, {x: 5000, y: ghostHeight3}, {x: 5500, y: ghostHeight3}, {x: 6000, y: ghostHeight3}, {x: 6500, y: ghostHeight3}, 
            {x: 7000, y: ghostHeight3}, {x: 7500, y: ghostHeight3}, {x: 8000, y: ghostHeight3}, {x: 8500, y: ghostHeight3}, {x: 9000, y: ghostHeight3},

            {x: 3500, y: ghostHeight4}, {x: 2500, y: ghostHeight4}, {x: 3000, y: ghostHeight4}, {x: 3500, y: ghostHeight4}, {x: 4000, y: ghostHeight4},
            {x: 4500, y: ghostHeight4}, {x: 5000, y: ghostHeight4}, {x: 5500, y: ghostHeight4}, {x: 6000, y: ghostHeight4}, {x: 6500, y: ghostHeight4}, 
            {x: 7000, y: ghostHeight4}, {x: 7500, y: ghostHeight4}, {x: 8000, y: ghostHeight4}, {x: 8500, y: ghostHeight4}, {x: 9000, y: ghostHeight4},

            {x: 3500, y: ghostHeight5}, {x: 2500, y: ghostHeight5}, {x: 3000, y: ghostHeight5}, {x: 3500, y: ghostHeight5}, {x: 4000, y: ghostHeight5},
            {x: 4500, y: ghostHeight5}, {x: 5000, y: ghostHeight5}, {x: 5500, y: ghostHeight5}, {x: 6000, y: ghostHeight5}, {x: 6500, y: ghostHeight5}, 
            {x: 7000, y: ghostHeight5}, {x: 7500, y: ghostHeight5}, {x: 8000, y: ghostHeight5}, {x: 8500, y: ghostHeight5}, {x: 9000, y: ghostHeight5}
        ],
        mainNinja: [{x:0, y:1830}]
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

        signs: [],
    
        stumps: [],
        slimes:[{x: 600, y: 0, boss: true}],
        knights: [],//[{x: 600, y: 0}, {x: 900, y: 0} ,{x: 1000, y: 0}, {x: 1200, y: 0}],
        ninjas: [], //[{x: 1500, y: 0},  {x: 1700, y: 0}, {x: 1900, y: 0}, {x: 2100, y: 0}],
        ghosts: [],
        mainNinja: []
    }
}   
