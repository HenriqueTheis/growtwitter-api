/*
  Warnings:

  - You are about to drop the `followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `retweets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tweets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoTweet" AS ENUM ('TWEET', 'RETWEET');

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followerId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "retweets" DROP CONSTRAINT "retweets_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "retweets" DROP CONSTRAINT "retweets_userId_fkey";

-- DropForeignKey
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_userId_fkey";

-- DropTable
DROP TABLE "followers";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "retweets";

-- DropTable
DROP TABLE "tweets";

-- DropTable
DROP TABLE "usuario";

-- DropEnum
DROP TYPE "TweetType";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "senha" TEXT NOT NULL,
    "auth_token" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "conteudo" VARCHAR(300),
    "tipo" "TipoTweet" NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "idUser" INTEGER NOT NULL,
    "idTweet" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("idUser","idTweet")
);

-- CreateTable
CREATE TABLE "Retweet" (
    "idUser" INTEGER NOT NULL,
    "idTweet" INTEGER NOT NULL,

    CONSTRAINT "Retweet_pkey" PRIMARY KEY ("idUser","idTweet")
);

-- CreateTable
CREATE TABLE "Seguidor" (
    "idUser" INTEGER NOT NULL,
    "idSeguidor" INTEGER NOT NULL,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("idUser","idSeguidor")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_idSeguidor_fkey" FOREIGN KEY ("idSeguidor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
