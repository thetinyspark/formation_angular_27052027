import { NamePipe } from './name.pipe';

// TDD Test Driven Development
// C'est une méthodologie qui consiste à écrire les tests en même temps que le code à produire. 
// Le but étant de décrire des cas d'utilisation, qui ne passent pas dans un premier temps, 
// puis d'écrire le code pour faire passer les tests relatifs à ces cas d'utilisations au fur et à mesure.
// Le but étant de couvrir un maximum de cas d'utilisation et de s'assurer que le code produit répond à tous nos besoins. 

describe('NamePipe', () => {
  fit('create an instance', () => {
    const pipe = new NamePipe();
    expect(pipe).toBeTruthy();
  });
});
