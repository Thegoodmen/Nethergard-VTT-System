import { NETHER } from "./modules/config.js";
import netherActor from "./modules/objects/NETHERActor.js";
import netherCharakterSheet from "./modules/sheets/nethercharakterSheet.js";

Hooks.once("init", async () => {

    console.log("NETHER | Initalizing Nethergard Core System");

    // Setting up the Global Configuration Object
    CONFIG.NETHER = NETHER;
    CONFIG.INIT = true;
    CONFIG.Actor.documentClass = netherActor;

    // Register custom Sheets and unregister the start Sheets
    // Items.unregisterSheet("core", ItemSheet);

    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "nether", netherCharakterSheet, { types: ["character"], makeDefault: true, label: "NETHER.SheetClassCharacter"});

    // Load all Partial-Handlebar Files
    preloadHandlebarsTemplates();

    // Register Additional Handelbar Helpers
    registerHandlebarsHelpers();  
});

Hooks.once("ready", async () => {

    // Finished Initalization Phase and release lock
    CONFIG.INIT = false;

    // Only execute when run as Gamemaster
    if(!game.user.isGM) return;   
});

function preloadHandlebarsTemplates() {

    const templatePaths = [

        "systems/nether/templates/partials/character-sheet-character.hbs",
        "systems/nether/templates/partials/character-sheet-background.hbs",
        "systems/nether/templates/partials/character-sheet-skill.hbs",
        "systems/nether/templates/partials/character-sheet-combat.hbs",
        "systems/nether/templates/partials/character-sheet-progression.hbs",

    ];
    
    return foundry.applications.handlebars.loadTemplates(templatePaths);
};

function registerHandlebarsHelpers() {

    Handlebars.registerHelper("equals", function(v1, v2) { return (v1 === v2)});

    Handlebars.registerHelper("contains", function(element, search) { return (element.includes(search))});

    Handlebars.registerHelper("concat", function(s1, s2, s3 = "") { return s1 + s2 + s3;});

    Handlebars.registerHelper("isGreater", function(p1, p2) { return (p1 > p2)});

    Handlebars.registerHelper("isEqualORGreater", function(p1, p2) { return (p1 >= p2)});

    Handlebars.registerHelper("ifOR", function(conditional1, conditional2) { return (conditional1 || conditional2)});

    Handlebars.registerHelper("doLog", function(value) { console.log(value)});

    Handlebars.registerHelper("toBoolean", function(string) { return (string === "true")});

    Handlebars.registerHelper('for', function(from, to, incr, content) {

        let result = "";

        for(let i = from; i < to; i += incr)
            result += content.fn(i);

        return result;
    });

    Handlebars.registerHelper("times", function(n, content) {
        
        let result = "";
        
        for(let i = 0; i < n; i++)
            result += content.fn(i);

        return result;
    });

    Handlebars.registerHelper("notEmpty", function(value) {

        if (value == 0 || value == "0") return true;
        if (value == null|| value  == "") return false;
        return true;
    });
}


/* -------------------------------------------- */
/*  General Functions                           */
/* -------------------------------------------- */