import { Global, Module } from "@nestjs/common";
import { v4 as uuid4 } from "uuid";
import { CommonController } from "./Common.controller";
import { CommonService } from "./Common.service";

@Global()
@Module({imports:[],
        exports:[],
        controllers:[CommonController],
        providers:[{
                provide:'uuid',
                useFactory: () => uuid4 //UUID is an external libary nest does'nt knwo how to intiaite soo we need a useFactory
        },CommonService],
}
)
export class CommonModule {}