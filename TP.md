# TP n°7

- Créer un service nommé LoginService qui contient une fonction nommée 
login() prenant en paramètre un pseudo et un mot de passe. 

- Si le pseudo et le mot de passe sont égaux à "admin" et "admin", alors on connecte l'utilisateur. 


- Vous pouvez tricher dans un premier temps, et utiliser le composant LoginComponent en ne mettant à l'intérieur qu'un bouton qui vous connecte avec les bons identifiants. 

- Une fois loggé, vous devez créer une guard nommée IsConnectedGuard et l'ajouter à la route du panier. 

- Si l'utilisateur n'est pas connecté, alors il ne peut accéder à son panier et ce, même si ce dernier est remplit (et vice versa, si on est connectés mais avec un panier vide, on n'accède pas au panier).


