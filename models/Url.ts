'use strict';

import {Model, Column, Table} from "sequelize-typescript";
@Table
export class Url extends Model<Url> {


  @Column
  realURL: string;

  @Column
  codeURL: string;


  
  static scope(...args: any[]): typeof Url {
    args[0] = args[0] || 'defaultScope';
    return super.scope.call(this, ...args);
  }
}