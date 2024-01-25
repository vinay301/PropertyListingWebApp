import { Ipropertybase } from "./Ipropertybase";

export class Property implements Ipropertybase{
  id: number;
  sellRent: number;
  name: string;
  propType: string;
  bhk: number;
  furnishType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  city: string;
  floorNo?: string;
  totalFloor?: string;
  RTM: number;
  AOP?: string;
  mainEntrance?: string;
  security?: number;
  gated?: number;
  maintenance?: number;
  possessionOn?: string;
  image?: string;
  description?: string;
  postedOn: string;
  postedBy: number;
}