let ghostLead = 5500;
let ghostHeight = 400;

let level1 = {
    // ground locations
    grounds: [{x: -200, y: 700, width: 2560}, {x: 300, y: 0, width: 1920}],

    // platform location
    platforms:[{x: 1180, y: 550, width: 128}, {x: 1564, y:400, width: 128}],
   
    // walls
    walls: [{x: 2360, y: -700, height: 1468}, {x: 2092, y: 0, height: 512}],

    // monster
    slimes: [{x: 1600, y: 350}, {x: 1200, y: 450}, {x: 1600, y: 350}, 
        {x: 1600, y: -300}, {x: 1300, y: -300},{x: 1400, y: -300} ],//[{x: 800, y: 0}], // {x: 640, y: 0}, {x: 680, y: 0}, {x: 720, y: 0}, {x: 760, y: 0}]

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
