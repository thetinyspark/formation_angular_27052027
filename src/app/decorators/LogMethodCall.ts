export function LogMethodCall(
    target:any, 
    propertyKey:string, 
    descriptor:PropertyDescriptor
){
    // on récupère la référence à la fonction 
    const func = descriptor.value;

    // on va changer la fonction pour y ajouter notre log
    descriptor.value = function(...args:any[]){
        console.log("[Call] method '"+propertyKey, "' with args: ", args);;
        return func.apply(this, args);
    };
}