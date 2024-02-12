import supabase from "./supabase";

export async function getClientData(userId) {
	const data = await getData(userId, "Clients", "id, aicoin")
	if (!data.length) {
		await supabase.from("Clients").insert({ authId: userId });
		data = await getData(userId, "Clients", "id, aicoin");
	}
	return data[0];
}

export async function getClientAicoinHistory(userId) {
	const data = await getData(userId, "ClientsAicoinLogs", "created_at, aicoin")
	if (!data.length) {
		await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
		data = await getData(userId, "ClientsAicoinLogs", "created_at, aicoin")
  }

	return data;
}
async function getData(id, from, select) {
	const { data } = await supabase
	.from(from)
	.select(select)
	.eq("authId", id);
	return data;
}