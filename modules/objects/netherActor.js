import * as Util from "../utils.js";
import * as LSFunction from "../listenerFunctions.js"

export default class netherActor extends Actor {

    prepareData() {

        // In case some stepps need to be overwritten later

        super.prepareData();
    }

    prepareDerivedData() {

        const actorData = this.system;

        // Add possability for switch Stament on the different Actor Types

        this._preparePlayerCharacterData(actorData);
    }

    _preparePlayerCharacterData(actorData) {

        // Calculation of Base Charakter Values

        this._setCharacterValues(actorData);
    }

    async _setCharacterValues(data) {

        // Calculation of Values here!

    }

    setNote(note) {

        // Methode to update Character Notes

        this.update({ "system.note": note});
    }

    addLogEntry(Entry) {

        // Add a Log Entry to the Charakter Event Log

        let log = this.system.log;
        log.push(Entry);
        this.update({ "system.log": log});
    }

}