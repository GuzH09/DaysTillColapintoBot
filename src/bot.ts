import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv';
dotenv.config();

// Twitter API credentials from .env
const client = new TwitterApi({
  appKey: process.env.API_KEY!,
  appSecret: process.env.API_SECRET!,
  accessToken: process.env.ACCESS_TOKEN!,
  accessSecret: process.env.ACCESS_TOKEN_SECRET!,
});

function daysUntilRace(): number {
  const raceDate = new Date('2025-05-02');
  const today = new Date();
  const diff = raceDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

async function tweetCountdown() {
  const daysLeft = daysUntilRace();
  let tweet: string;

  if (daysLeft > 0) {
    tweet = `${daysLeft} días para Colapinto en Miami`;
  } else if (daysLeft === 0) {
    tweet = `Hoy Colapinto corre en Miami.`;
  } else {
    tweet = ''
  }

  try {
    await client.v2.tweet(tweet);
    console.log('Tweeted:', tweet);
  } catch (error) {
    console.error('Error tweeting:', error);
  }
}

// Run the bot
tweetCountdown();
