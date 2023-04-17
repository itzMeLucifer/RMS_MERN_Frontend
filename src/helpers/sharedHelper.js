export const sharedHelper = {
    handleInputChange : function(e,setterObj,setterFn){
        const {name,value} = e.target;
        setterFn({...setterObj,error:'',[name]:value})
    }
}
