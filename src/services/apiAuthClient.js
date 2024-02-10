import supabase from "./supabase";

export async function getClientData(userId) {

  var { data } = await supabase
    .from("Clients")
    .select("id, aicoin")
    .eq("authId", userId);
  if (data[0] === undefined) {
    await supabase.from("Clients").insert({ authId: userId });
    data = await supabase
      .from("Clients")
      .select("id, aicoin")
      .eq("authId", userId);
      var { data: rowData, error } = await supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    if (error) throw new Error(error.message);
    let [data] = rowData; 
    if (data === undefined){
        await supabase.from('Clients').insert({'authId': userId})
        data = await supabase.from('Clients').select('id, aicoin').eq('authId', userId);
    } 
    return data

  }
  return data[0];
}

export async function getClientAicoinHistory(userId) {
  var { data: ClientsAicoinLogsData } = await supabase
    .from("ClientsAicoinLogs")
    .select("created_at, aicoin")
    .eq("authId", userId);
  if (ClientsAicoinLogsData[0] === undefined) {
    await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
    data: ClientsAicoinLogsData = await supabase
      .from("ClientsAicoinLogs")
      .select("created_at, aicoin")
      .eq("authId", authId);
  }
  var created_at = getListfromDictionary(ClientsAicoinLogsData, "created_at");
  var aicoin = getListfromDictionary(ClientsAicoinLogsData, "aicoin");
  return { created_at, aicoin };
}

export async function getClientReferralHistory(userId) {
  var { data: ClientsAicoinLogsData } = await supabase
    .from("ClientsAicoinLogs")
    .select("created_at, aicoin")
    .eq("authId", userId);
  if (ClientsAicoinLogsData[0] === undefined) {
    await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
    data: ClientsAicoinLogsData = await supabase
      .from("ClientsAicoinLogs")
      .select("created_at, aicoin")
      .eq("authId", authId);
  }
  var created_at = getListfromDictionary(ClientsAicoinLogsData, "created_at");
  var aicoin = getListfromDictionary(ClientsAicoinLogsData, "aicoin");
  return { created_at, aicoin };
}

function getListfromDictionary(list, keyDictionary) {
  const a = [];
  for (let i = 0; i < list.length; i++) {
    a.push(list[i][keyDictionary]);
  }
  return a;
}