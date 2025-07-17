import { Data } from '../model/interfaceData';
import { lerCSV } from '../model/readCSV';
import { escreverCSV } from '../model/writeCSV';

// Função auxiliar para obter apenas os itens ativos 
async function getActiveItens(): Promise<Data[]> {

    const itens = await lerCSV();
    return itens.filter(item => item.Ativo);

}

// Adiciona Item
export async function AdicionarItem(itemData: Omit<Data, 'ID' | 'Ativo'>): Promise<Data> {
   
    const itens = await lerCSV();
    const maxId + 1
}

//Remver Item

//Listar Itens

//Ver Valor Total

//Ver Peso Total

//Calcular Media de Valor

// Ver quantidade Total de Itens 

//Ver quantidade Total de Produtos

//Buscar ID
