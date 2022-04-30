import { createHmac } from 'crypto'

const oauth1a = require('oauth-1.0a');

export class OauthHelper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: { key: process.env.CONSUMERKEY, secret: process.env.CONSUMERSECRET },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
      },
    })
    const authorization = oauth.authorize(request, {
      key: process.env.TOKENKEY,
      secret: process.env.TOKENSECRET,
  });

  return oauth.toHeader(authorization);
  }
}