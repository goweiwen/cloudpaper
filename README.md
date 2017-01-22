# Cloudpaper.

## Introduction
A webapp for collaborative document viewing designed for students to study
together effectively.

## Inspiration

## What it does


## How we built it

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for Cloudpaper

## Deployment 

### Connection Guide
```javascript
For Unix-based Operating systems, do ssh <ip-address> -l <username>. Enter the password thereafter.
Once you're done, 

do screen -r cloudpaper (If it doesn't work, find the name of the screen by doing screen -ls.) 

Once all is good, you should be able to see the node's console. Ctrl + C followed by the following commands: 
lsof -i :3000

and finally, 

kill -9 <PID>

This allows us to properly kill the node that was previous active.

Last but not least,

git pull
```
followed by a yarn start.
