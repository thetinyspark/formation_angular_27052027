import { CATALOG } from '../mocks/product.mocks';
import { NamePipe } from './name.pipe';

// TDD Test Driven Development
// C'est une méthodologie qui consiste à écrire les tests en même temps que le code à produire. 
// Le but étant de décrire des cas d'utilisation, qui ne passent pas dans un premier temps, 
// puis d'écrire le code pour faire passer les tests relatifs à ces cas d'utilisations au fur et à mesure.
// Le but étant de couvrir un maximum de cas d'utilisation et de s'assurer que le code produit répond à tous nos besoins. 

fdescribe('NamePipe Test Suite', () => {
  it('create an instance', () => {
    const pipe = new NamePipe();
    expect(pipe).toBeTruthy();
  });

  CATALOG.map( product => product.name ).forEach( search =>{

    it('should return all matching products when given ' + search, () => {
      const products = CATALOG;
      const pipe = new NamePipe();
      const results = pipe.transform(products, search);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((product) => {
        expect(product.name).toContain(search);
      });
    });

  });

  CATALOG.map( product => product.name.toLowerCase() ).forEach( search =>{

    it('should return all matching products when given ' + search + ' in lowercase', () => {
      const products = CATALOG;
      const pipe = new NamePipe();
      const results = pipe.transform(products, search);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((product) => {
        expect(product.name.toLowerCase()).toContain(search);
      });
    });

  });

  CATALOG.map( product => product.name.toUpperCase() ).forEach( search =>{

    it('should return all matching products when given ' + search + ' in uppercase', () => {
      const products = CATALOG;
      const pipe = new NamePipe();
      const results = pipe.transform(products, search);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((product) => {
        expect(product.name.toUpperCase()).toContain(search);
      });
    });

  });


  it('should return all products when search is empty ', () => {
    const products = CATALOG;
    const pipe = new NamePipe();
    const results = pipe.transform(products, '');
    expect(results).toEqual(products);
  });
  
});
