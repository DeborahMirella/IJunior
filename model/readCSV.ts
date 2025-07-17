/*
  Esse módulo tem a responsabilidade de ler o arquivo de
  banco de dados (estoque.csv) e transformar seu conteúdo
  textual em um array de objetos JavaScript 
*/

import fs from 'fs';                        // Importa o módulo 'fs' (File System), que é nativo o Node.js. Ele nos da as ferramentas para interagir com o sistema de arquivos do computador 
import { Data } from './interfaceData' ;   //  Importa a interface 'Data' de um arquivo local
import csvParser from 'csv-parser';       // Importa a fnção principal da biblioteca 'csv-parser' (que foi instalada via npm). Esta função é a ferramenta especializada que sabe como interpretar o formato CSV

const ARQUIVO_SCV = './estoque.csv'

export function lerCSV(): Promise<Data[]> {

    return new Promise((resolve, reject) => {

    const resultados: Data[] = [];

    fs.createReadStream(ARQUIVO_SCV)

    .on('error', (err) => {

        if ((err as any).code === 'ENOENT') {

            resolve([]);

        } else {

            reject(err);

        }
    })

    .pipe(csvParser())

    .on('data', (dado) => resultados.push(dado)) 

    .on('end', () => {

        resolve(resultados);

    });

    });

}