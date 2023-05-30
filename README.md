# AliExpress Clone / (aliexpress-clone)

## App 设置运行以下指令 (localhost)

```
cp .env.example .env

npm i

npx prisma generate

npm run dev
```

设置一个 Supabase 帐户和 Stripe 帐户，然后将所有详细信息添加到您的 .env 文件中。

将应用程序连接到 Supabase 后。 您还需要设置 Auth Provider：
    Google [Google](https://cloud.google.com)
    Github [Github](https://github.com/settings/developers)

    https://supabase.com/docs/guides/auth/social-login/auth-google
    https://supabase.com/docs/guides/auth/social-login/auth-github


运行命令来迁移您的数据库表并运行seed.js文件。
```
npx prisma migrate dev --name init
```



# 图片预览

<img width="1439" src="https://user-images.githubusercontent.com/108229029/234481659-ede8c034-b085-4a45-8d80-6271c6050474.png">



