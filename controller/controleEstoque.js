"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAdicionarItem = handleAdicionarItem;
exports.handleRemoverItem = handleRemoverItem;
exports.handleListarItens = handleListarItens;
exports.handleVerRelatorios = handleVerRelatorios;
const inquirer_1 = __importDefault(require("inquirer"));
const service = __importStar(require("../service/serviceEstoque"));
// Lógica para adcionar um item 
function handleAdicionarItem() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Adicionar Novo Item ---');
        try {
            const respostas = yield inquirer_1.default.prompt([
                { type: 'input', name: 'Nome', message: 'Nome do item:' },
                { type: 'number', name: 'Peso', message: 'Peso (Kg):' },
                { type: 'number', name: 'Valor', message: 'Valor (R$):' },
                { type: 'number', name: 'Quantidade', message: 'Quantidade:' },
            ]);
            if (!respostas.Nome || isNaN(respostas.Peso) || isNaN(respostas.Valor) || isNaN(respostas.Quantidade)) {
                console.log('\n ERRO: Todos os campos são obrigatórios e os valores númericos devem ser corretos.');
                return;
            }
            yield service.AdicionarItem(respostas);
            console.log('\n Item adicionado com sucesso');
        }
        catch (error) {
            console.error('\n Ocorreu um erro ao adicionar o item:', error);
        }
    });
}
// Lógica para remover um item 
function handleRemoverItem() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n --- Remover Item ---');
        try {
            const { id } = yield inquirer_1.default.prompt([{ type: 'number', name: 'id', message: 'Digite o ID do item a ser reovido: ' }]);
            if (isNaN(id)) {
                console.log('\n Erro: O ID informado é inválido.');
                return;
            }
            const item = yield service.buscarItemPorId(id);
            if (!item) {
                console.log('\n ERRO: Item com o ID informado não foi encontrado.');
                return;
            }
            console.log('\n Você está prestes a remover o seguinte item:');
            console.table([item]);
            const { confirmacao } = yield inquirer_1.default.prompt([{
                    type: 'confirm',
                    name: 'confirmacao',
                    message: 'Tem certeza que deseja remover esse item?',
                    default: false
                }
            ]);
            if (confirmacao) {
                yield service.RemoverItem(id);
                console.log('\n Item removido com sucesso!');
            }
            else {
                console.log('\n Operação de remoção cancelada.');
            }
        }
        catch (error) {
            console.error('\n Ocorreu um erro ao remover o item:', error);
        }
    });
}
//Exibição da lista de itens do estoque
function handleListarItens() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itens = yield service.listarItens();
            console.log('\n--- Lista de itens do estoque ---');
            if (itens.length === 0) {
                console.log('O estoque está vazio.');
            }
            else {
                console.table(itens);
            }
        }
        catch (error) {
            console.error('\n Ocorreu um erro ao listar os itens:', error);
        }
    });
}
//Exibição de relátorio
function handleVerRelatorios() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('\n--- Relatório Completo do Estoque ---');
            const [valorTotal, pesoTotal, mediaValor, mediaPeso, totalItens, produtosUnicos] = yield Promise.all([
                service.calcularValorTotal(),
                service.calcularPesoTotal(),
                service.calcularMediaDeValor(),
                service.calcularMediaDePeso(),
                service.calcularQuantidadeTotalItens(),
                service.contarProdutosUnicos()
            ]);
            console.log(`Diversidade de Produto: ${produtosUnicos}`);
            console.log(`Volume Total de Itens: ${totalItens}`);
            console.log('-----------------------------------');
            console.log(`Valor Total do Estoque: ${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
            console.log(`Peso Total do Estoque: ${pesoTotal.toFixed(2)} Kg`);
            console.log('--------------------------------------------------');
            console.log(`Média de Valor po Produto: ${mediaValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
            console.log(`Media de Peso por Produto: ${mediaPeso.toFixed(2)} Kg`);
        }
        catch (error) {
            console.error('\n Ocorreu um erro ao gerar os relatórios:', error);
        }
    });
}
