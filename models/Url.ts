'use strict';

import {Model, Column, Table, CreatedAt, UpdatedAt} from "sequelize-typescript";
@Table
export class Url extends Model<Url> {


	@Column
	realURL: string;

	@Column
	codeURL: string;

	@CreatedAt
	@Column
	createdAt: Date;

	@UpdatedAt
	@Column
	updatedAt: Date;

  
	static scope(...args: any[]): typeof Url {
		args[0] = args[0] || 'defaultScope';
		return super.scope.call(this, ...args);
	}
}