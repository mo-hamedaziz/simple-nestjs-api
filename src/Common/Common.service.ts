import { Inject, Injectable } from "@nestjs/common";



@Injectable()

export class CommonService {
    constructor(@Inject('uuid') private readonly UUID: () =>string) {}

    GetUUID():string{
        return this.UUID()
        
    }
}