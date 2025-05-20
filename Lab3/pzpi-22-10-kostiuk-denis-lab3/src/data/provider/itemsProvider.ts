import simpleRestProvider from "ra-data-simple-rest";
import {API_URL, httpClient} from "../utils.ts";

export const itemProvider = simpleRestProvider(API_URL+"/v2", httpClient);