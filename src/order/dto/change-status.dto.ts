import { ApiProperty } from "@nestjs/swagger";
import { StatusOfOrder } from "utils/enums/OrderStatus";

export class ChangeStatusDto {
    @ApiProperty({ example: "PAYMENT", description: "статус чтоб изменить статус" })
    status: StatusOfOrder
}