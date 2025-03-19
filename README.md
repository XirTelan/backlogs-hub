WIP




# General

BacklogHub - project where you have one space to create,customize  and manage your own backlogs just the way you want.

Tech stack: NextJs, Tailwind, FramerMotion, React Hook Forms,Zod,Swr, mongoose, Jest


![image](https://github.com/user-attachments/assets/014383dc-afac-4114-a35b-f2c75deebf58)




# Creating backlogs

![CreatingBacklogDemo)](https://github.com/user-attachments/assets/9cec4a09-fbe5-4a90-8643-4a8657a9be42)


# Manage

![image](https://github.com/user-attachments/assets/2b079631-1793-4027-97f9-b990df255006)



# Installation

Requiered .env content:

ID and SECRET for OAUTH


```
DOMAIN_URL=
GOOGLE_ID=
GOOGLE_SECRET=
DISCORD_ID=
DISCORD_SECRET=

AUTH_SECRET=
MONGODB_URI=mongodb+srv
```

Redirect links

```
NEXT_PUBLIC_GOOGLEOAUTH=https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${DOMAIN_URL}/api/auth/callback/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&include_granted_scopes=true
NEXT_PUBLIC_DISCORDOAUTH=https://discord.com/api/oauth2/authorize?client_id=${DISCORD_ID}&response_type=code&redirect_uri=${DOMAIN_URL}&scope=email+identify
```


