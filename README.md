WIP

Необходимое содержание env для работы

DOMAIN_URL=http://localhost:3000

ид и секрет для Oauth гугла и дискорда\
GOOGLE_ID= _ \
GOOGLE_SECRET=_ \
DISCORD_ID=_ \
DISCORD_SECRET=_

ссылки для редиректа

NEXT_PUBLIC_GOOGLEOAUTH=https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${DOMAIN_URL}/api/auth/callback/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&include_granted_scopes=true
NEXT_PUBLIC_DISCORDOAUTH=https://discord.com/api/oauth2/authorize?client_id=${DISCORD_ID}&response_type=code&redirect_uri=${DOMAIN_URL}&scope=email+identify

AUTH_SECRET= Для генерации токенов
MONGODB_URI=mongodb+srv:// Подключение к бд
