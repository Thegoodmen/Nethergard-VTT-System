import * as Util from "../utils.js";
import * as LSFunction from "../listenerFunctions.js"
import * as Dialog from "../dialog.js";

const api = foundry.applications.api;
const sheets = foundry.applications.sheets;

export default class netherCharakterSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheetV2) {

    sheetContext = {};

    static DEFAULT_OPTIONS = {

        tag: "form",
        classes: ["nether", "sheet", "characterSheet"],
        actions: {
            
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        position: {
            width: 650,
            height: 825
        }
    }

    static PARTS = {

        header: { template: "systems/nether/templates/sheets/character/header.hbs" },
        sidebar: { template: "systems/nether/templates/sheets/character/sidebar.hbs" },
        description: { template: "systems/nether/templates/sheets/character/description.hbs" }
    }

    get title() {
        
        return this.actor.name;
    }
            
    /** @override */
    _configureRenderOptions(options) {

        super._configureRenderOptions(options);

        if (this.document.limited) options.parts = ["description"]
        else options.parts = ["header", "sidebar", "description"];
    }
    
    /** @override */
    async _prepareContext(options) {

        // #################################################################################################
        // #################################################################################################
        // ##                                                                                             ##
        // ## Creates Basic Datamodel, which is used to fill the HTML together with Handelbars with Data. ##
        // ##                                                                                             ##
        // #################################################################################################
        // #################################################################################################
        
        const baseData = await super._prepareContext();
        
        const context = {
    
            // Set General Values
            owner: baseData.document.isOwner,
            editable: baseData.editable,
            actor: baseData.document,
            system: baseData.document.system,
            items: baseData.document.items,
            config: CONFIG.NETHER,
            isGM: baseData.user.isGM,
            effects: baseData.document.effects
        }

        this.sheetContext = context;

        return context;
    }
}