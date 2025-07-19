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
    
    }
    
}