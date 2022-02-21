let ghostLead = 5500;
let ghostHeight = 400;

let level1 = {
    // ground locations
    grounds: [{x: -328, y: 700, width: 4224}, {x: 300, y: 0, width: 1920}, {x: 56, y: -500, width: 2304}],

    // platform location
    platforms:[{x: 1180, y: 550, width: 128}, {x: 1564, y:400, width: 128}, {x: 200, y:-190, width: 128}, 
        {x: 800, y:-650, width: 128}, {x: 1312, y:-800, width: 128}, {x: 1824, y:-950, width: 128}, {x: 1312, y:-1100, width: 128}, 
        {x: 1824, y:-1250, width: 128}, {x: 2208, y:-1401, width: 0}],
   
    // walls
    walls: [{x: -328, y: -708, height: 1536},{x: 1964, y: 1, height: 512}, 
        {x: 2360, y: -1400, height: 2176}, {x: 3640, y: -1348, height: 2176}],

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

    // ghosts: [{x: ghostLead, y: ghostHeight}, {x: ghostLead + 50, y: ghostHeight}, 
    //     {x: ghostLead + 100, y: ghostHeight}, {x: ghostLead + 150, y: ghostHeight}, 
    //     {x: ghostLead + 200, y: ghostHeight}, {x: ghostLead + 250, y: ghostHeight}, 
    //     {x: ghostLead + 300, y: ghostHeight}, {x: ghostLead + 350, y: ghostHeight}, 
    //     {x: ghostLead + 400, y: ghostHeight}, {x: ghostLead + 450, y: ghostHeight}, 
    //     {x: ghostLead + 500, y: ghostHeight}]
};
