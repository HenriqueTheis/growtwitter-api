/*
  Warnings:

  - You are about to drop the column `name` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `nome` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "name",
ADD COLUMN     "nome" VARCHAR(50) NOT NULL;
