import {config} from "../../test/resources/Config/configProperties"
export default class TestDataReader {

    private JSONFile: string

    setJsonFileName(name: string) {
        this.JSONFile=name;
    }

    getName() {

        return this.JSONFile;

    }

    getJSON() {
        return require('../../../testData/' + this.JSONFile + '.json'); // reads the json file based on the
    }
    getJSONReport() {
        return require('../../../JsonReport/' + this.JSONFile + '.json')
    }

    getPDFJSON() {
        return require('../../../PDFFiles/' + this.JSONFile +'.json');
    }
}