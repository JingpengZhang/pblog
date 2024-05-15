import { DockerSolid } from "./src/docker";
import { EyeSolid } from "./src/eye-solid";
import { HeartSolid } from "./src/heart-solid";
import { JavaSolid } from "./src/java-solid";
import { LinkSolid } from "./src/link-solid";
import { MySQLSolid } from "./src/mysql-solid";
import { NestJsSolid } from "./src/nest-js-solid";
import { NginxSolid } from "./src/nginx-solid";
import { NodeJSSolid } from "./src/node-js-solid";
import { PlusSolid } from "./src/plus-solid";
import { ReactSolid } from "./src/react-solid";
import { VueSolid } from "./src/vue-solid";
import { WebpackSolid } from "./src/webpack-solid";

export const SolidIcons = {
  LinkSolid,
  HeartSolid,
  EyeSolid,
  VueSolid,
  ReactSolid,
  NestJsSolid,
  MySQLSolid,
  DockerSolid,
  NginxSolid,
  NodeJSSolid,
  WebpackSolid,
  JavaSolid,
  PlusSolid,
};

export type SolidIconName = keyof typeof SolidIcons;
