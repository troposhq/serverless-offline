'use strict';

module.exports = function createLambdaKongProxyContext(request, options, stageVariables) {

  let body = request.payload;
  const headers = request.unprocessedHeaders;

  if (body) {
    if (typeof body !== 'string') {
      // JSON.stringify(JSON.parse(request.payload)) is NOT the same as the rawPayload
      body = request.rawPayload;
    }
    headers['Content-Length'] = Buffer.byteLength(body);

    // Set a default Content-Type if not provided.
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
  }

  return {
    request_body_args: JSON.parse(body),
    request_method: request.method.toUpperCase(),
    request_uri: request.path,
    request_body: body,
    request_headers: headers,
    request_uri_args: {},
  };
};
