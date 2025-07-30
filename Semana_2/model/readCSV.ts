/*
  Esse módulo tem a responsabilidade de ler o arquivo de
  banco de dados (estoque.csv) e transformar seu conteúdo
  textual em um array de objetos JavaScript 
*/

import fs from 'fs';                        // Importa o módulo 'fs' (File System), que é nativo o Node.js. Ele nos da as ferramentas para interagir com o sistema de arquivos do computador 
import { Data } from './interfaceData' ;   //  Importa a interface 'Data' de um arquivo local
import csvParser from 'csv-parser';       // Importa a fnção principal da biblioteca 'csv-parser' (que foi instalada via npm). Esta função é a ferramenta especializada que sabe como interpretar o formato CSV

const ARQUIVO_CSV = './estoque.csv'

export function lerCSV(): Promise<Data[]> {

    return new Promise((resolve, reject) => {

    const resultados: Data[] = [];

    fs.createReadStream(ARQUIVO_CSV)

    .on('error', (err) => {

        if ((err as any).code === 'ENOENT') {

            resolve([]);

        } else {

            reject(err);

        }
    })

    .pipe(csvParser({

        mapValues: ({ header, index, value }) => {

            switch (header.trim()) {
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


    } ))

    .on('data', (dado: Data) =>  resultados.push(dado))
    .on('end', () => {
        resolve(resultados);
        
    });

 });
    
}
