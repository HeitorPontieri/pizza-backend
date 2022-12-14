/*
  Warnings:

  - You are about to drop the `tbl_teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tbl_teste`;

-- CreateTable
CREATE TABLE `tbl_bebida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teor_alcoolico` DOUBLE NOT NULL,
    `volume` DOUBLE NOT NULL,
    `id_produto` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_produto_bebida`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_botoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `img` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_colaboradores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_usuario` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_formulario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `mensagem` TEXT NOT NULL,
    `criticas_sugestoes` VARCHAR(25) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `celular` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_horario_de_funcionamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abertura` TIME(0) NOT NULL,
    `fechamento` TIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingredientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingrediente_principal` VARCHAR(45) NOT NULL,
    `acompanhamentos` VARCHAR(120) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingredientes_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pizza` INTEGER NOT NULL,
    `id_ingredientes` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_ingredientes_ingredientes`(`id_ingredientes`),
    INDEX `FK_pizza_ingredientes`(`id_pizza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_produto_pizza`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(75) NOT NULL,
    `imagem` VARCHAR(150) NOT NULL,
    `status_promocao` VARCHAR(25) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `porcentagem_desconto` FLOAT NULL,
    `status_favorito` INTEGER NULL,
    `tipo_produto` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_servicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(70) NOT NULL,
    `id_horario_funcionamento` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_horario_servicos`(`id_horario_funcionamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_bebida` ADD CONSTRAINT `FK_produto_bebida` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_ingredientes_pizza` ADD CONSTRAINT `FK_ingredientes_ingredientes` FOREIGN KEY (`id_ingredientes`) REFERENCES `tbl_ingredientes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_ingredientes_pizza` ADD CONSTRAINT `FK_pizza_ingredientes` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza` ADD CONSTRAINT `FK_produto_pizza` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_servicos` ADD CONSTRAINT `FK_horario_servicos` FOREIGN KEY (`id_horario_funcionamento`) REFERENCES `tbl_horario_de_funcionamento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
