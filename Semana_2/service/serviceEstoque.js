"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdicionarItem = AdicionarItem;
exports.RemoverItem = RemoverItem;
exports.listarItens = listarItens;
exports.calcularValorTotal = calcularValorTotal;
exports.calcularPesoTotal = calcularPesoTotal;
exports.calcularMediaDeValor = calcularMediaDeValor;
exports.calcularMediaDePeso = calcularMediaDePeso;
exports.calcularQuantidadeTotalItens = calcularQuantidadeTotalItens;
exports.contarProdutosUnicos = contarProdutosUnicos;
exports.buscarItemPorId = buscarItemPorId;
const readCSV_1 = require("../model/readCSV");
const writeCSV_1 = require("../model/writeCSV");
// Função auxiliar para obter apenas os itens ativos 
function getActiveItens() {
    return __awaiter(this, void 0, void 0, function* () {
        const itens = yield (0, readCSV_1.lerCSV)();
        return itens.filter(item => item.Ativo);
    });
}
// Adiciona Item
function AdicionarItem(itemData) {
    return __awaiter(this, void 0, void 0, function* () {
        const itens = yield (0, readCSV_1.lerCSV)();
        const maxId = itens.reduce((max, item) => (item.ID > max ? item.ID : max), 0);
        //Implementação do ID
        const novoItem = Object.assign(Object.assign({ ID: maxId + 1 }, itemData), { Ativo: true });
        itens.push(novoItem);
        yield (0, writeCSV_1.escreverCSV)(itens);
        return novoItem;
    });
}
//Remover Item
function RemoverItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Lê todos os itens do arquivo
        const itens = yield (0, readCSV_1.lerCSV)();
        //Procura o indice do item 
        const itemIndex = itens.findIndex(item => item.ID === id && item.Ativo);
        //Verifica se o item foi encontrado
        if (itemIndex === -1) {
            return null;
        }
        itens[itemIndex].Ativo = false;
        yield (0, writeCSV_1.escreverCSV)(itens);
        return itens[itemIndex];
    });
}
//Listar Itens
function listarItens() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getActiveItens();
    });
}
//Ver Valor Total
function calcularValorTotal() {
    return __awaiter(this, void 0, void 0, function* () {
        // Primeiro, obtemos a lista de apenas itens ativos
        const activeItens = yield getActiveItens();
        // Uso do método reduce para fazer a soma
        return activeItens.reduce((total, item) => total + (item.Valor * item.Quantidade), 0);
    });
}
//Ver Peso Total
function calcularPesoTotal() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        return activeItens.reduce((total, item) => total + (item.Peso * item.Quantidade), 0);
    });
}
//Calcular Media de Valor
function calcularMediaDeValor() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        // Boa prática
        if (activeItens.length === 0)
            return 0;
        // Soma o valor de cada tipo de produto 
        const somaDosValores = activeItens.reduce((total, item) => total + item.Valor, 0);
        // Calcula a média
        return somaDosValores / activeItens.length;
    });
}
//Calcular Média de Peso dos Itens
function calcularMediaDePeso() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        if (activeItens.length === 0)
            return 0;
        const somaDosPesos = activeItens.reduce((total, item) => total + item.Peso, 0);
        return somaDosPesos / activeItens.length;
    });
}
// Ver quantidade Total de Itens 
function calcularQuantidadeTotalItens() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        return activeItens.reduce((total, item) => total + item.Quantidade, 0);
    });
}
//Ver quantidade Total de Produtos
function contarProdutosUnicos() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        return activeItens.length;
    });
}
function buscarItemPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const activeItens = yield getActiveItens();
        return activeItens.find(item => item.ID === id);
    });
}
