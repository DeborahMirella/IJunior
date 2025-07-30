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
    
    /*
    console.log("\n\n--- [DEBUG] INÍCIO DO PROCESSO AdicionarItem ---");
    console.log("Dados recebidos para o novo item:", itemData);
    */

    const itens = await lerCSV();
    
    /*
    const itensAntes = await lerCSV();
    console.log("--- [DEBUG] DADOS LIDOS DO CSV (ANTES DE ADICIONAR): ---");
    console.table(itensAntes);
    */

    const maxId = itens.reduce((max,item) => (item.ID > max ? item.ID : max), 0);
    //const maxId = itensAntes.reduce((max, item) => (item.ID > max ? item.ID : max), 0);
    
    //Implementação do ID
    const novoItem: Data = {
    ID: maxId + 1,
    ...itemData,
    Ativo: true,

};
    
/*
    console.log("--- [DEBUG] NOVO ITEM CRIADO: ---", novoItem);
     
    const itensDepois = [...itensAntes, novoItem];
    console.log("--- [DEBUG] LISTA COMPLETA (ANTES DE SALVAR NO CSV): ---");
    console.table(itensDepois);
*/

itens.push(novoItem);
await escreverCSV(itens);

/*
    await escreverCSV(itensDepois);
    console.log("--- [DEBUG] ESCRITA NO CSV CONCLUÍDA. ---");
    console.log("--- [DEBUG] FIM DO PROCESSO AdicionarItem ---\n\n");
*/

    return novoItem;

}

//Remover Item
export async function RemoverItem(id: number): Promise<Data | null> {

    // Lê todos os itens do arquivo
    const itens = await lerCSV();

    //Procura o indice do item 
    const itemIndex = itens.findIndex(item => item.ID === id && item.Ativo);
    
    //Verifica se o item foi encontrado
    if (itemIndex === -1) {
        return null;
    }

    itens[itemIndex].Ativo = false;

    await escreverCSV(itens);

    return itens[itemIndex];
}

//Listar Itens
export async function listarItens(): Promise<Data[]> {

    return await getActiveItens();

}

//Ver Valor Total
export async function calcularValorTotal(): Promise<number> {

    // Primeiro, obtemos a lista de apenas itens ativos
    const activeItens = await getActiveItens();

    // Uso do método reduce para fazer a soma
    return activeItens.reduce((total, item) => total + (item.Valor * item.Quantidade), 0);
}

//Ver Peso Total
export async function calcularPesoTotal(): Promise<number> {

    const activeItens = await getActiveItens();

    return activeItens.reduce((total, item) => total + (item.Peso * item.Quantidade), 0);
}

//Calcular Media de Valor
export async function calcularMediaDeValor(): Promise<number> {
   
    const activeItens = await getActiveItens();
    
    // Boa prática
    if (activeItens.length === 0) return 0;
    
    // Soma o valor de cada tipo de produto 
    const somaDosValores = activeItens.reduce((total, item) => total + item.Valor, 0);
    

    // Calcula a média
    return somaDosValores / activeItens.length;


}

//Calcular Média de Peso dos Itens
export async function calcularMediaDePeso(): Promise<number> {

    const activeItens = await getActiveItens();

    if (activeItens.length === 0) return 0;

    const somaDosPesos = activeItens.reduce((total, item) => total + item.Peso, 0);

    return somaDosPesos / activeItens.length;

}

// Ver quantidade Total de Itens 
export async function calcularQuantidadeTotalItens(): Promise<number> {

    const activeItens = await getActiveItens();

    return activeItens.reduce((total, item) => total + item.Quantidade, 0);
}

//Ver quantidade Total de Produtos
export async function contarProdutosUnicos(): Promise<number> {

    const activeItens = await getActiveItens();

    return activeItens.length;

}

export async function buscarItemPorId(id: number): Promise<Data | undefined> {

    const activeItens = await getActiveItens();

    
    return activeItens.find(item => item.ID === id);
}
