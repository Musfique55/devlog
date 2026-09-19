import Redis from "ioredis";
import { envVars } from "./env";

const redis = new Redis(envVars.REDIS_URL);

export default redis;
