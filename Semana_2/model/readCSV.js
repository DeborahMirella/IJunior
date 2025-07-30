"use strict";
/*
  Esse módulo tem a responsabilidade de ler o arquivo de
  banco de dados (estoque.csv) e transformar seu conteúdo
  textual em um array de objetos JavaScript
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerCSV = lerCSV;
const fs_1 = __importDefault(require("fs")); // Importa o módulo 'fs' (File System), que é nativo o Node.js. Ele nos da as ferramentas para interagir com o sistema de arquivos do computador 
const csv_parser_1 = __importDefault(require("csv-parser")); // Importa a fnção principal da biblioteca 'csv-parser' (que foi instalada via npm). Esta função é a ferramenta especializada que sabe como interpretar o formato CSV
const ARQUIVO_SCV = './estoque.csv';
function lerCSV() {
    return new Promise((resolve, reject) => {
        const resultados = [];
        fs_1.default.createReadStream(ARQUIVO_SCV)
            .on('error', (err) => {
            if (err.code === 'ENOENT') {
                resolve([]);
            }
            else {
                reject(err);
            }
        })
            .pipe((0, csv_parser_1.default)({
            mapValues: ({ header, index, value }) => {
                switch (header) {
                    case 'ID':
                    case 'Valor':
                    case 'Peso':
                    case 'Quantidade':
                        return Number(value);
                    case 'Ativo':
                        return value.toLowerCase() === 'true' || value === '1';
                    default:
                        return value;
                }
            }
        }))
            .on('data', (dado) => resultados.push(dado))
            .on('end', () => {
            resolve(resultados);
        });
    });
}
