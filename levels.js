let ghostLead = 800;
let ghostHeight = 500;

let level1 = {
    // ground locations
    grounds: [{x: -256, y: 700, width: 2560}, {x: 2400, y:700, with: 1280}],

    // platform location
    platforms:[{x: 700, y: 400, width: 128}],
   
    // walls
    walls: [{x: 100, y: 0, height: 512}, {x: 400, y: 128, height: 512}],

    // monster
    slimes: [{x: 300, y: -100}], // {x: 640, y: 0}, {x: 680, y: 0}, {x: 720, y: 0}, {x: 760, y: 0}]

    knight: [{x: 600, y: -100}], //{x: 840, y: 0}, {x: 900, y: 0}, {x: 940, y: 0}, {x: 1000, y: 0}

    ghosts: [{x: 800, y: ghostHeight}, {x: ghostLead + 50, y: ghostHeight}, {x: ghostLead + 100, y: ghostHeight}, {x: ghostLead + 150, y: ghostHeight}, {x: ghostLead + 200, y: ghostHeight}, {x: ghostLead + 250, y: ghostHeight}, {x: ghostLead + 300, y: ghostHeight}, {x: ghostLead + 350, y: ghostHeight}, {x: ghostLead + 400, y: ghostHeight}, {x: ghostLead + 450, y: ghostHeight}, {x: ghostLead + 500, y: ghostHeight}]
};