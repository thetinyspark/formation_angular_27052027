

type Constructable<T> = new (...args:any[]) => T;
const allClasses:any[] = []; 

export function RegisterClass<T>(metadata:any){
    return function(target:Constructable<T>){
        allClasses.push({target, metadata}); 
        console.log(target, metadata, allClasses);
    }
}