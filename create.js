import uuid from 'uuid';
import { success, failure } from "./libs/response-libs";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.item);
    } catch (e) {
        return failure({status: false});
    }
}