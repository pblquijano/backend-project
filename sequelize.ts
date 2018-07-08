import {Sequelize} from 'sequelize-typescript';

const Op = Sequelize.Op;
export const sequelize = new Sequelize({
  operatorsAliases: { $and: Op.and },
  dialect: 'mysql',
  database: 'shorts_urls',
  host: "127.0.0.1",
  username: 'shorturl_u',
  password: 'hmJ9j5TByrjwBlSK',
  modelPaths: [__dirname + '/models']
});