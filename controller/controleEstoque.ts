import inquirer from 'inquirer';
import * as service from '../service/serviceEstoque';

export async function handleAdicionarItem() {

    console.log('\n--- Adicionar Novo Item ---');
    const respostas = await inquirer.prompt([
        { type: 'input', name: 'Nome',message: 'Nome do item:' },
        { type: 'number', name: 'Peso', message: 'Peso (Kg):'},
        { type: 'number', name: 'Valor', message: 'Valor (R$):'},
        { type: 'number', name: 'Quantidade', message: 'Quantidade:'},
    ]);

    if (!respostas.Nome || isNan)

    
}