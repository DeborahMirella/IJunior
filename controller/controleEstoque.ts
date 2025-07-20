import inquirer from 'inquirer';
import * as service from '../service/serviceEstoque';

// Lógica para adcionar um item 
export async function handleAdicionarItem() {

    console.log('\n--- Adicionar Novo Item ---');

    try {
    const respostas = await inquirer.prompt([
        { type: 'input', name: 'Nome',message: 'Nome do item:' },
        { type: 'number', name: 'Peso', message: 'Peso (Kg):'},
        { type: 'number', name: 'Valor', message: 'Valor (R$):'},
        { type: 'number', name: 'Quantidade', message: 'Quantidade:'},
    ]);

    if (!respostas.Nome || isNaN(respostas.Peso) || isNaN(respostas.Valor) || isNaN(respostas.Quantidade)) {
        console.log('\n ERRO: Todos os campos são obrigatórios e os valores númericos devem ser corretos.');
        return;    
}

await service.AdicionarItem(respostas);
console.log('\n Item adicionado com sucesso');

    } catch (error) {

        console.error('\n Ocorreu um erro ao adicionar o item:', error);

    }
}

// Lógica para remover um item 
export async function handleRemoverItem(): Promise<void> {

    console.log('\n --- Remover Item ---');

    try {
        const { id } = await inquirer.prompt([{ type: 'number', name: 'id', message: 'Digite o ID do item a ser reovido: '}])
    if (isNaN(id)) {
        console.log('\n Erro: O ID informado é inválido.');
        return;
    }

    const item = await service.buscarItemPorId(id);

    if (!item) {

        console.log('\n ERRO: Item com o ID informado não foi encontrado.');
        return;

    }

    console.log('\n Você está prestes a remover o seguinte item:');
    console.table([item]);

    const { confirmacao } = await inquirer.prompt ([{

        type: 'confirm',
        name: 'confirmacao',
        message: 'Tem certeza que deseja remover esse item?',
        default: false
    }
]);

    if (confirmacao) { 

        await service.RemoverItem(id);

        console.log('\n Item removido com sucesso!');

    } else { 

        console.log('\n Operação de remoção cancelada.');
    }

} catch (error) {

    console.error('\n Ocorreu um erro ao remover o item:', error);

}
    
}

//Exibição da lista de itens do estoque
export async function handleListarItens(): Promise<void> {

    try {

        const itens = await service.listarItens();

        console.log('\n--- Lista de itens do estoque ---');

        if (itens.length === 0) {
            console.log ('O estoque está vazio.');

        } else { 

            console.table(itens);

        }
    } catch (error)  {

       console.error('\n Ocorreu um erro ao listar os itens:', error);
    }
}

//Exibição de relátorio
export async function handleVerRelatorios(): Promise<void> {

    try { 
        console.log('\n--- Relatório Completo do Estoque ---');

        const [valorTotal, pesoTotal, mediaValor, mediaPeso, totalItens, produtosUnicos] = await Promise.all ([
              
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

        console.log(`Valor Total do Estoque: ${valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}`);
        
        console.log(`Peso Total do Estoque: ${pesoTotal.toFixed(2)} Kg`);
        
        console.log('--------------------------------------------------');
        
        console.log(`Média de Valor po Produto: ${mediaValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}`);
        
        console.log(`Media de Peso por Produto: ${mediaPeso.toFixed(2)} Kg`);
    }

    catch (error) {

        console.error('\n Ocorreu um erro ao gerar os relatórios:', error);
    }
}

