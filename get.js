import { success, failure } from "./libs/response-libs";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call('get', params);
        return result.Item ? success(result.Item) : failure({ status: false, error: "Item not found." })
    } catch (e) {
        console.log(e);
        return failure({ status: false })
    }
}