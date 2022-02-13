let ghostLead = 5500;
let ghostHeight = 400;

let level1 = {
    // ground locations
    grounds: [{x: 0, y: 700, width: 2560 + 2560}],

    // platform location
    platforms:[{x: 700, y: 400, width: 128}, {x: 1300, y:550, width: 128}],
   
    // walls
    walls: [{x: 100, y: 0, height: 512}, {x: 400, y: 228, height: 384}],

    //tree stump locations
    stumps: [{x: 200, y: 600}],

    // monster
    slimes: [{x: 800, y: 0}], // {x: 640, y: 0}, {x: 680, y: 0}, {x: 720, y: 0}, {x: 760, y: 0}]

    knights: [{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}

    ninjas: [{x: 1100, y: 0}],

    //ghosts: []
    ghosts: [{x: ghostLead, y: ghostHeight}, {x: ghostLead + 50, y: ghostHeight}, 
        {x: ghostLead + 100, y: ghostHeight}, {x: ghostLead + 150, y: ghostHeight}, 
        {x: ghostLead + 200, y: ghostHeight}, {x: ghostLead + 250, y: ghostHeight}, 
        {x: ghostLead + 300, y: ghostHeight}, {x: ghostLead + 350, y: ghostHeight}, 
        {x: ghostLead + 400, y: ghostHeight}, {x: ghostLead + 450, y: ghostHeight}, 
        {x: ghostLead + 500, y: ghostHeight}]
};
