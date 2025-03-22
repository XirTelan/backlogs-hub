WIP

[EN VERSION](README.md)



# Основное

BacklogHub - проект где у вы можете создавать,настраивать и организовать ваши бекологи в одном месте как вам угодно 

Стэк: NextJs, Tailwind, FramerMotion, React Hook Forms,Zod,Swr, mongoose, Jest


![image](https://github.com/user-attachments/assets/014383dc-afac-4114-a35b-f2c75deebf58)




# Создание беколога

![CreatingBacklogDemo)](https://github.com/user-attachments/assets/9cec4a09-fbe5-4a90-8643-4a8657a9be42)

# Просмотр беклога

![image](https://github.com/user-attachments/assets/eb1bf82a-cf35-48bf-9e40-f22b2812f0c1)



# Организация

![image](https://github.com/user-attachments/assets/2b079631-1793-4027-97f9-b990df255006)



# Установка

Содержание .env

ID и SECRET для OAUTH


```
DOMAIN_URL=
GOOGLE_ID=
GOOGLE_SECRET=
DISCORD_ID=
DISCORD_SECRET=

AUTH_SECRET=
MONGODB_URI=mongodb+srv
```

Сссылки редиректа для OAUTH

```
NEXT_PUBLIC_GOOGLEOAUTH=https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${DOMAIN_URL}/api/auth/callback/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&include_granted_scopes=true
NEXT_PUBLIC_DISCORDOAUTH=https://discord.com/api/oauth2/authorize?client_id=${DISCORD_ID}&response_type=code&redirect_uri=${DOMAIN_URL}&scope=email+identify
```


