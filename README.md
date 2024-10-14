# voltaikAPI ⚡️

[![My Skills](https://skillicons.dev/icons?i=express,mongo,)](https://skillicons.dev)

## Description

This is a simple API that allows you to create, read, update and delete employees of a fake company name _Voltaik_. It is built with Node.js, Express.js and MongoDB.

## TODO

- [x] Authentication and authorization
- [x] Rate limiting
- [x] Testing
- [ ] Host with Railway

## Hosting Trouble

I am putting the hosting portion of thie project on the back-burner for now, my problem with Railway was that I had to provide a static IP address for my MongoDB Atlas cluster for whitelisting. Unfortunately, Railway does not have a public static IP to use (and whitelisting everywhere isn't a secure practice). My next idea was to use a proxy server to act as an intermediary between the two services. However proxy service providers like Cloudflare and Heroku are not free (My last resort was recieving so much abuse that as of January 31st 2021 it stopped serving as an open proxy, [Cors-Anywhere](https://github.com/Rob--W/cors-anywhere/issues/301)). However this wouldn't be a problem in the real world (since if a client wanted their own backend only API they would have to pay for it's hosting). I hope to find a (viable, free) solution to this problem in the future.
