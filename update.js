import { success, failure } from "./libs/response-libs";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression:"SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        ReturnValue: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call('update', params);
        return success(result.Items)
    } catch (e) {
        return failure({status: false})
    }
}