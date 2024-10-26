###
Rotas para Empresas

Criar uma empresa
Método: POST
Rota: /api/companies
Body (JSON):
{
"name": "empresa exemplo"
}

Listar todas as empresas
Método: GET
Rota: /api/companies


###
Rotas para Status das Sugestões

Criar um status
Método: POST
Rota: /api/statuses
Body (JSON):
{
"name": "pendente",
"description": "sugestão pendente de aprovação"
}

Listar todos os status
Método: GET
Rota: /api/statuses


###
Rotas para Sugestões

Criar uma sugestão
Método: POST
Rota: /api/suggestions
Body (JSON):
{
"title": "melhoria de ux",
"description": "sugestão para melhorar a experiência do usuário",
"companyId": "uuid-da-empresa-existente",
"statusId": "uuid-do-status-existente"
}

Listar todas as sugestões
Método: GET
Rota: /api/suggestions

Deletar uma sugestão
Método: DELETE
Rota: /api/suggestions/

Substitua
pelo ID da sugestão

Resumo das Rotas

Criar uma empresa: POST /api/companies
Listar todas as empresas: GET /api/companies
Criar um status: POST /api/statuses
Listar todos os status: GET /api/statuses
Criar uma sugestão: POST /api/suggestions
Listar todas as sugestões: GET /api/suggestions
Deletar uma sugestão: DELETE /api/suggestions/
