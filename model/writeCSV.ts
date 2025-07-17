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
            
            { id: 'ID', title: 'ID'},
            { id: 'Nome', title: 'Nome' },
            { id: 'Peso', title: 'Peso '},
            { id: 'Valor', title: 'Valor' },
            { id: 'Quantidade', title: 'Quantidade'},
            { id: 'Ativo', title: 'Ativo'},

        ],

    });
    
    try {

    await csvWriter.writeRecords(data);

    } catch (error) {

        console.error("Erro ao escrever dados no arquivo CSV:", error);

        throw error;
    }

}
