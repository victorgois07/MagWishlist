import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWishlistDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
