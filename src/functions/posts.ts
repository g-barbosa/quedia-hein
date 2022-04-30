import axios from 'axios'
import { OauthHelper } from '../helpers/OauthHelper'
import { profiles, week } from '../utils/memes'

const baseTweetsUrl = 'https://api.twitter.com/2/users'

export const handler = async () => {

  const weekdayIndex = new Date().getDay() - 1
  const weekday = week[weekdayIndex];

  const profile = profiles.find(profile => profile.weekday == weekday)

  if (!profile) return

  const request = {
    url: `${baseTweetsUrl}/${profile.profileId}/tweets`,
    method: 'GET',
    body: null
  }

  let authHeader = OauthHelper.getAuthHeaderForRequest(request);

  const { data } = await axios.get(request.url, { headers: authHeader })

  const { data: tweets } = data

  const tweet = tweets.find(tweet => tweet.text.startsWith('https://'))

  request.method = 'POST'
  request.url = `${baseTweetsUrl}/${process.env.USERID}/retweets`
  request.body = {
    "tweet_id": tweet.id
  }

  authHeader = OauthHelper.getAuthHeaderForRequest(request);

  await axios.post(request.url, request.body, { headers: authHeader });
}