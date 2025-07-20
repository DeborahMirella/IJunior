import inquirer from 'inquirer';
import * as controller from './controller/controleEstoque';

async function mainMenu(): Promise<void> {

    while (true) {

        console.log('\n====================');
        console.log(' Sistema de Gestão de Estoque');
        console.log('======================');
    
     try {

        const { acao } = await inquirer.prompt([

            {
                type: 'list', 
                name: 'acao',
                message: 'O que você deseja fazer?',
                choices: [
                    'Listar Itens',
                    'Adicionar Item',
                    'Remover Item',
                    'Ver Relatórios Completos',
                    new inquirer.Separator(),
                    'Sair',
                ],
            },

        ]);

        switch (acao) {

            case 'Listar Itens':
                await controller.handleListarItens();
                break;
            case 'Adicionar Item':
                await controller.handleAdicionarItem();
                break;
            case 'Remover Item':
                await controller.handleRemoverItem();
                break;
            case 'Ver Relatórios Completos':
                await controller.handleVerRelatorios();
                break;
            case 'Sair':

            console.log('\nQue o Senhor o abençõe. Encerrando o sistema.');
            return;
        }
    } catch (error) {

        console.error ('Ocorreu um erro no menu principal', error);

    }

    await inquirer.prompt([{ type: 'input', name: 'continue', message: '\n Pressione ENTER para voltar ao menu' }]);
   
   }

}

mainMenu();