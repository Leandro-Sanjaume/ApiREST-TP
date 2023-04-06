export class Virus{
    sciName : String;
    virusType : String;
    hasVaccine : Boolean;

    constructor(sciName : String, virusType : String, hasVaccine : Boolean){
            this.sciName = sciName;
            this.virusType = virusType;
            this.hasVaccine = hasVaccine;
    }

    public static fromJson(jsonString: string): Virus {
        const parsedJson = JSON.parse(jsonString);
        return new Virus(parsedJson.sciName, parsedJson.virusType, parsedJson.hasVaccine);
      }
}