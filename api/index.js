import { createRequestHandler } from "@shopify/hydrogen";
import * as build from "../build/server/index.js";

const handleRequest = createRequestHandler({ build });

export default async function handler(request, response) {
    try {
        const res = await handleRequest(request);
        response.status(res.status).send(await res.text());
    } catch (error) {
        response.status(500).send(error.message);
    }
}