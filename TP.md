# TP n°8

- Créer un fichier employees.json, contenant des données de ce type: 
[
    {
        "id": <userid>,
        "name": <username>
    }
]
- Créer un fichier salaries.json, contenant des données sous cette forme: 

[
    {
        "userid": <userid>
        "amount": <amount>
    }
]


- Dans la méthode du catalog service, créez une promesse customisée permettant de télécharger les deux fichiers en question, et de fournir en résultat un tableau d'objets de cette forme: 

[
    {
        "id": <userid>,
        "salary": <amount>,
        "name": <username>
    }
]


