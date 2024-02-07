import supabase from "./supabase";


export async function getClientData(userId) {
    const { data: rowData, error } = await supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    if (error) throw new Error(error.message);
    const [data] = rowData; 
    if (data === undefined){
        await supabase.from('Clients').insert({'authId': userId})
        data = await supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    } 
    return data
  }

/*export async function getPermision(userId) {
    const { data, error } = await supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    if (data[0] === undefined){
        await supabase.from('Clients').insert({authId: userId})
        console.log("Клієнта створено");

        data = supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    } 
    return data[0]
  }
*/