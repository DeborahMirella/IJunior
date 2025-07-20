"use strict";
/*
  Esse módulo tem a responsabilidade de pegar um array de objetos JavaScripit
  e escrevê-lo no arquivo estoque.csv
*/
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
exports.escreverCSV = escreverCSV;
const csv_writer_1 = require("csv-writer");
const ARQUIVO_CSV = './estoque.csv';
function escreverCSV(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: ARQUIVO_CSV,
            //Define as colunas do arquivo CSV
            header: [
                { id: 'ID', title: 'ID' },
                { id: 'Nome', title: 'Nome' },
                { id: 'Peso', title: 'Peso ' },
                { id: 'Valor', title: 'Valor' },
                { id: 'Quantidade', title: 'Quantidade' },
                { id: 'Ativo', title: 'Ativo' },
            ],
        });
        try {
            yield csvWriter.writeRecords(data);
        }
        catch (error) {
            console.error("Erro ao escrever dados no arquivo CSV:", error);
            throw error;
        }
    });
}
