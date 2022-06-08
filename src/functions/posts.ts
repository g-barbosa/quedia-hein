import axios from 'axios'
import { OauthHelper } from '../helpers/OauthHelper'
import { profiles, week } from '../utils/memes'

const baseTweetsUrl = 'https://api.twitter.com/2/users'

const getTweet = async (request) => {
  let authHeader = OauthHelper.getAuthHeaderForRequest(request);

  const { data } = await axios.get(request.url, { headers: authHeader })

  const { data: tweets } = data

  const tweet = tweets.find(tweet => tweet.text.startsWith('https://'))

  return tweet
}

const retweet = async(request) => {
  let authHeader = OauthHelper.getAuthHeaderForRequest(request);
  await axios.post(request.url, request.body, { headers: authHeader });
}

export const handler = async () => {
  let weekdayIndex = new Date().getDay()
  weekdayIndex = weekdayIndex > 5 ? 5 : weekdayIndex

  const weekday = week[weekdayIndex];

  const profile = profiles.find(profile => profile.weekday == weekday)

  if (!profile) return

  for (let profileId of profile.profilesId) {
    const request = {
      url: `${baseTweetsUrl}/${profileId}/tweets`,
      method: 'GET',
      body: null
    }

    const tweet = await getTweet(request)

    request.method = 'POST'
    request.url = `${baseTweetsUrl}/${process.env.USERID}/retweets`
    request.body = {
      "tweet_id": tweet.id
    }
    await retweet(request)
  }
}