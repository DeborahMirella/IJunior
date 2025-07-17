/*
  Esse módulo tem a responsabilidade de pegar um array de objetos JavaScripit
  e escrevê-lo no arquivo estoque.csv
*/

import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

import { Data } from './interfaceData';

const ARQUIVO_CSV = './estoque.csv'

export async function escreverCSV(data: Data[]) : Promise<void> { 

    const csvWriter = createCsvWriter ({

        path: ARQUIVO_CSV,
        
        //Define as colunas do arquivo CSV
        header: [

            { id: 'id', title: 'id' },
            { id: 'nome', title: 'id' },
            { id: 'quantidade', title: 'quantidade '},
            { id: 'precoUnitario', title: 'precoUnitario' },
            { id: 'dataEntrada', title: 'dataEntrada'},

        ],

    });

    await csvWriter.writeRecords(data);

}
